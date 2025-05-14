# E-Commerce Product Page

A **responsive e-commerce product page** built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **React**, showcasing a premium T-shirt. Inspired by Mercado Livre, Shopee, and Amazon, it meets a technical challenge with dynamic features and a modern UI.

![Screenshot_1](https://github.com/user-attachments/assets/6e308d65-c95f-4ac9-948b-44893673f4cb)

---

## 📝 Requirements

- **Product Images**: Main image (~35% of screen) with clickable thumbnails below; image changes with fade transition.
- **Product Details**: Title and dynamic price based on size:
  - Small: `$149.99`
  - Medium: `$199.99`
  - Large: `$249.99`
  - Includes animated transitions.
- **Variant Selectors**: Dynamic size (Small, Medium, Large) and color (White, Black, Red, Blue) selectors.
- **Delivery Check**: CEP input with ViaCEP API integration to display full address or error.
- **State Persistence**: User actions saved in `localStorage` for 15 minutes.
- **Design**: Practical, flexible, inspired by major e-commerce platforms.
- **Deliverables**: Public GitHub repository and Vercel deployment.

---

## 🚀 Features

- **Responsive UI**: Mobile-first design with Tailwind CSS.
- **Dynamic Variants**: Size/color selectors from `productData`.
- **Animations**: 
  - Fade-in/out for images
  - Fade/slide for price changes via `framer-motion`
- **CEP Lookup**: Real-time address validation with ViaCEP API.
- **Persistence**: 15-minute localStorage for user selections.
- **Modern Styling**: Gradient background, hover effects, `lucide-react` icons.
- **Error Handling**: Fallback for missing images and CEP validation errors.
- **Type Safety**: Built with TypeScript for robust, maintainable code.

---

## 🛠️ Technologies

- `Next.js` 14.2.5  
- `TypeScript`  
- `Tailwind CSS`  
- `Framer Motion`  
- `Lucide React`  
- `Axios`  
- `React`

---

## ⚙️ Setup

### Clone Repository:
```bash
git clone https://github.com/juanfsouza/Test-Tecnico-Front
cd Test-Tecnico-Front
```
