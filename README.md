# Warehouse Group of Companies - E-Commerce Website

This repository contains the front-end codebase for the **Warehouse Group of Companies**, a premium e-commerce platform specializing in tech, wearables, and luxury imports (drones, adapters, cables, shoes, bags). 

This README is designed to provide comprehensive context about the project's architecture, tech stack, and logic, making it easy to understand and upgrade.

---

## 🚀 Tech Stack
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: Custom, built-in SVG components (zero dependency, premium aesthetic)
- **Routing**: Client-side state-based routing (no external routing library like `react-router-dom` is currently used).

---

## 📁 Folder Structure

```text
Warehouse-website/
├── public/                 # Static assets that don't go through the bundler
│   └── vite.svg            # Default Vite icon
├── src/                    # Main source code directory
│   ├── assets/             # Images and local assets
│   │   ├── react.svg
│   │   ├── warehouse.jpeg
│   │   └── WhatsApp Image...jpeg (Product/Logo images)
│   ├── App.css             # Base application styles
│   ├── App.jsx             # Core Application Component (contains all UI, logic, and data)
│   ├── index.css           # Global CSS, Tailwind imports, and base layers
│   └── main.jsx            # React entry point, renders <App /> into the DOM
├── .gitignore              # Files ignored by Git
├── eslint.config.js        # ESLint configuration for code quality
├── index.html              # Main HTML template
├── package.json            # Project metadata, scripts, and dependencies
├── postcss.config.js       # PostCSS config (used by Tailwind)
├── tailwind.config.js      # Tailwind CSS configuration and theme settings
└── vite.config.js          # Vite configuration
```

---

## 🧠 Application Architecture & Logic (Inside `src/App.jsx`)

Currently, the entire application logic, data, and UI components are centralized within a single file: `src/App.jsx`.

### 1. State Management
The application uses standard React Hooks for state management:
- `cart`: Array holding items added to the cart along with their quantities.
- `currentView`: String dictating which page/view to display (`"home"`, `"shop"`, `"contact"`, `"bulk"`, `"catalog"`). This acts as a lightweight, custom router.
- `selectedCategory`: String used to filter products in the shop view.
- `searchQuery`: String for the product search bar.
- `isMenuOpen` & `isCartOpen`: Booleans toggling the mobile menu and shopping cart slide-overs.
- `scrolled`: Boolean tracking window scroll position to trigger the sticky navigation styling.

### 2. Data Models (Hardcoded)
Product and category data are defined as static constants at the top of the file:
- `IMAGE_URLS`: A dictionary mapping product names to high-quality Unsplash image URLs.
- `PRODUCTS`: An array of objects. Each object contains:
  - `id`, `category`, `name`, `price`, `originalPrice`, `rating`, `badge` (optional), and `image`.
- `CATEGORIES`: An array defining the filterable categories.

### 3. Core Features & Functions
- **Cart Operations**: 
  - `addToCart(product)`: Adds a new item or increments the quantity if it exists.
  - `updateQty(id, delta)`: Increases or decreases item quantity (minimum 1).
  - `removeItem(id)`: Removes an item completely.
- **Dynamic Filtering**: Uses `useMemo` (`filteredProducts`) to efficiently filter the `PRODUCTS` array based on the `selectedCategory` and `searchQuery`.
- **WhatsApp Checkout (`handleWhatsAppCheckout`)**: Instead of a traditional payment gateway, clicking "Confirm Order" generates a formatted text string of the cart contents and redirects the user to WhatsApp (`https://wa.me/...`) to finalize the purchase directly with the business.

### 4. UI Components (Inline)
- **Icons**: A suite of custom SVG icons (e.g., `ShoppingBag`, `Menu`, `Zap`, `ShieldCheck`) defined as functional components at the top of `App.jsx`.
- **Navigation**: A sticky, responsive navbar that changes opacity and styling based on scroll position (`scrolled` state).
- **Slide-overs**: Custom animated sidebars for the Mobile Menu and Cart, utilizing Tailwind's `translate-x` for smooth slide-in effects.
- **Views**: Conditional rendering based on `currentView` displays the Hero section (Home), Product Grid (Shop), or Forms (Contact/Bulk).

---

## 💡 Guide for Future Upgrades (AI Context)

If you are an AI or developer tasked with upgrading this codebase, consider the following structural improvements:

1. **Component Refactoring (High Priority)**:
   - Split `src/App.jsx` into multiple files within a `src/components/` directory (e.g., `Navbar.jsx`, `Cart.jsx`, `ProductCard.jsx`, `Hero.jsx`).
   - Move views into a `src/pages/` directory (e.g., `Home.jsx`, `Shop.jsx`, `Contact.jsx`).
2. **Implement Routing**:
   - Replace the `currentView` state logic with `react-router-dom` to support actual URLs, browser history, and deep linking.
3. **Externalize Data**:
   - Move the `PRODUCTS` and `CATEGORIES` arrays into a separate data file (e.g., `src/data/products.js`) or fetch them from a backend API/CMS (like Supabase, Firebase, or Sanity).
4. **State Management Scaling**:
   - If the app grows, consider extracting the Cart logic into a React Context API (`CartProvider`) or using a state library like Zustand/Redux so props don't need to be passed deeply.
5. **E-commerce Backend**:
   - Transition from the WhatsApp checkout to a real payment gateway (Stripe, Razorpay) by integrating a Node.js/Express backend or a Next.js API route.

---

## 💻 Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in the development mode using Vite. Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The page will reload when you make changes.

### `npm run build`
Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`
Runs ESLint to check for code quality and syntax issues.
