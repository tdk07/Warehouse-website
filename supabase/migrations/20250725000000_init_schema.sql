-- Extensions
create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "pg_trgm";    -- fuzzy search, see §13 performance notes

-- =========================================================
-- 1. Profiles (extends auth.users with app-specific role data)
-- =========================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin', 'staff')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create a profilae row whenever a new auth user signs up.
-- New users always default to 'customer' — admins are promoted manually (see §7).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- 2. Categories
-- =========================================================
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- 3. Products
-- =========================================================
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  short_description text,
  price numeric(10, 2) not null check (price >= 0),
  original_price numeric(10, 2) check (original_price >= 0),
  currency text not null default 'USD',
  category_id uuid references public.categories(id) on delete set null,
  sku text unique,
  stock_quantity int not null default 0 check (stock_quantity >= 0),
  stock_status text not null default 'in_stock'
    check (stock_status in ('in_stock', 'low_stock', 'out_of_stock', 'preorder', 'discontinued')),
  rating numeric(2, 1) not null default 0 check (rating >= 0 and rating <= 5),
  badge text,                          -- e.g. "New", "Bestseller", "Limited"
  is_visible boolean not null default false,   -- controls public storefront visibility
  is_deleted boolean not null default false,   -- soft delete
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_products_category on public.products (category_id);
create index idx_products_visible on public.products (is_visible) where is_deleted = false;
create index idx_products_search_trgm on public.products using gin (name gin_trgm_ops);
create index idx_products_slug on public.products (slug);

-- keep updated_at fresh automatically
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

create trigger trg_categories_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

-- =========================================================
-- 4. Product Images (multiple images per product)
-- =========================================================
create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,      -- path inside the 'product-images' bucket
  alt_text text,
  sort_order int not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_product_images_product on public.product_images (product_id);

-- Only one primary image per product
create unique index uniq_one_primary_image_per_product
  on public.product_images (product_id)
  where is_primary = true;

-- =========================================================
-- 5. Settings (WhatsApp number, store info — editable without redeploying)
-- =========================================================
create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles(id)
);

-- seed defaults
insert into public.settings (key, value) values
  ('whatsapp_number', '"+10000000000"'),
  ('store_name', '"Warehouse Group of Companies"'),
  ('low_stock_threshold', '5');

-- =========================================================
-- 6. Inquiries (Contact + Bulk Order form submissions)
-- =========================================================
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('contact', 'bulk_order')),
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  product_interest text,          -- free text or product id reference for bulk quotes
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'spam')),
  created_at timestamptz not null default now()
);

create index idx_inquiries_status on public.inquiries (status);

-- =========================================================
-- 7. Audit Logs (tamper-resistant — populated by triggers, not client code)
-- =========================================================
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,           -- 'insert' | 'update' | 'delete'
  entity_type text not null,      -- 'product' | 'category' | 'settings'
  entity_id uuid,
  old_values jsonb,
  new_values jsonb,
  created_at timestamptz not null default now()
);

create index idx_audit_logs_entity on public.audit_logs (entity_type, entity_id);
create index idx_audit_logs_created on public.audit_logs (created_at desc);

create or replace function public.log_product_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.audit_logs (actor_id, action, entity_type, entity_id, old_values, new_values)
  values (
    auth.uid(),
    lower(tg_op),
    'product',
    coalesce(new.id, old.id),
    case when tg_op in ('update', 'delete') then to_jsonb(old) else null end,
    case when tg_op in ('update', 'insert') then to_jsonb(new) else null end
  );
  return coalesce(new, old);
end;
$$;

create trigger trg_audit_products
  after insert or update or delete on public.products
  for each row execute function public.log_product_changes();

-- =========================================================
-- 8. Row Level Security Strategy
-- =========================================================

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.settings enable row level security;
alter table public.inquiries enable row level security;
alter table public.audit_logs enable row level security;

-- ---------------------------------------------------------
-- Helper: is_admin()
-- ---------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('admin', 'staff')
      and is_active = true
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and is_active = true
  );
$$;

-- ---------------------------------------------------------
-- PRODUCTS
-- ---------------------------------------------------------
create policy "public_read_visible_products"
  on public.products for select
  using (is_visible = true and is_deleted = false);

create policy "staff_read_all_products"
  on public.products for select
  using (public.is_admin());

create policy "staff_insert_products"
  on public.products for insert
  with check (public.is_admin());

create policy "staff_update_products"
  on public.products for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "admin_delete_products"
  on public.products for delete
  using (public.is_super_admin());

-- ---------------------------------------------------------
-- CATEGORIES
-- ---------------------------------------------------------
create policy "public_read_active_categories"
  on public.categories for select
  using (is_active = true);

create policy "staff_manage_categories_select"
  on public.categories for select
  using (public.is_admin());

create policy "staff_write_categories"
  on public.categories for insert with check (public.is_admin());
create policy "staff_update_categories"
  on public.categories for update using (public.is_admin()) with check (public.is_admin());
create policy "admin_delete_categories"
  on public.categories for delete using (public.is_super_admin());

-- ---------------------------------------------------------
-- PRODUCT IMAGES
-- ---------------------------------------------------------
create policy "public_read_images_of_visible_products"
  on public.product_images for select
  using (
    exists (
      select 1 from public.products p
      where p.id = product_images.product_id
        and p.is_visible = true and p.is_deleted = false
    )
  );

create policy "staff_manage_images"
  on public.product_images for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------
-- PROFILES
-- ---------------------------------------------------------
create policy "user_read_own_profile"
  on public.profiles for select
  using (id = auth.uid());

create policy "admin_read_all_profiles"
  on public.profiles for select
  using (public.is_super_admin());

create policy "user_update_own_profile_limited"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- ---------------------------------------------------------
-- SETTINGS
-- ---------------------------------------------------------
create policy "admin_read_settings"
  on public.settings for select using (public.is_super_admin());
create policy "admin_write_settings"
  on public.settings for all using (public.is_super_admin()) with check (public.is_super_admin());

create or replace function public.get_public_settings()
returns jsonb
language sql
security definer
set search_path = public
stable
as $$
  select jsonb_object_agg(key, value)
  from public.settings
  where key in ('whatsapp_number', 'store_name');
$$;
grant execute on function public.get_public_settings() to anon, authenticated;

-- ---------------------------------------------------------
-- INQUIRIES
-- ---------------------------------------------------------
create policy "public_submit_inquiry"
  on public.inquiries for insert
  with check (true);

create policy "staff_read_inquiries"
  on public.inquiries for select using (public.is_admin());
create policy "staff_update_inquiries"
  on public.inquiries for update using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------
-- AUDIT LOGS
-- ---------------------------------------------------------
create policy "admin_read_audit_logs"
  on public.audit_logs for select using (public.is_admin());
