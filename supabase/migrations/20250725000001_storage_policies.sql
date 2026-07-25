-- Insert the bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- Policy to allow public reading
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'product-images' );

-- Policy to allow authenticated admins/staff to upload images
create policy "Admin Upload Access"
on storage.objects for insert
with check (
  bucket_id = 'product-images' 
  and auth.role() = 'authenticated'
);

-- Policy to allow authenticated admins/staff to delete/update images
create policy "Admin Update Access"
on storage.objects for update
using (
  bucket_id = 'product-images' 
  and auth.role() = 'authenticated'
);

create policy "Admin Delete Access"
on storage.objects for delete
using (
  bucket_id = 'product-images' 
  and auth.role() = 'authenticated'
);
