# 🥕 Food Product Explorer

**Food Product Explorer** is a responsive web application built with React and Tailwind CSS that allows users to search, filter, and view detailed nutritional information about food products using the [OpenFoodFacts API](https://world.openfoodfacts.org/). The application supports category filtering, nutrition grade sorting, barcode lookup, and more.

![Food Product Explorer Screenshot](./screenshots/homepage.png) <!-- Replace with actual screenshot paths -->

---

## 🚀 Features

- 🔍 **Product Search** by name or barcode
- 📂 **Category Filtering** with dynamic dropdowns
- 📊 **Sorting** by product name or nutrition grade
- 🏦 **Product Details Page** with:

  - Ingredients list
  - Nutrition grade
  - Labels (vegan, gluten-free, etc.)
  - Product images

- ♻️ **Responsive Design** for all devices
- 🧠 **State Management** using React hooks
- 📦 **Reusable Components** for clean, scalable architecture

---

## 🥪 Live Demo

Check out the live demo here: [https://foodproductswebsite.ramgopalreddy.xyz](https://foodproductswebsite.ramgopalreddy.xyz)

---

## 🛠️ Tech Stack

| Tech              | Description                 |
| ----------------- | --------------------------- |
| React             | Frontend library            |
| Tailwind CSS      | Utility-first CSS framework |
| Axios             | HTTP client for API calls   |
| React Router      | For routing between pages   |
| OpenFoodFacts API | Food product data source    |

---

## 📁 Folder Structure

```
/src
 ├── components
 │   ├── Header.jsx
 │   ├── PageTitle.jsx
 │   ├── ProductCard.jsx
 │   └── Spinner.jsx
 ├── pages
 │   ├── ProductsPage.jsx
 │   └── ProductDetailPage.jsx
 ├── App.jsx
 ├── index.js
 └── ...
```

## Structure Image

![Structure  Image](./screenshots/structure.png)

---

## 🔧 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/ramgopal-reddy/FoodProductWebsite.git
cd FoodProductWebsite
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the development server:**

```bash
npm run dev
```

4. Open your browser and go to:
   `http://localhost:5173` (or the port shown in terminal)

---

## 🌐 API Reference

**Base URL:**
`https://world.openfoodfacts.org/`

### Key Endpoints Used

- 🔍 **Search by name:**
  `https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&json=true`

- 🏷️ **List of categories:**
  `https://world.openfoodfacts.org/categories.json`

- 🦾 **Get products by category:**
  `https://world.openfoodfacts.org/category/{category}.json`

- 📦 **Product details by barcode:**
  `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`

---

## 🎨 Color Theme

- ✅ Primary: `#34A853` (Green)
- 🔏 Text: `#333333`
- ⚪ Background: `#FAFAFA`, `#E6F4EA`, `#FFFFFF`
- 🔵 Accent/Focus: `#1A73E8`

These are used via Tailwind utility classes for quick and responsive styling.

---

## 📸 Screenshots

| Home Page                           | Product Details                              |
| ----------------------------------- | -------------------------------------------- |
| ![home](./screenshots/homepage.png) | ![details](./screenshots/product-detail.png) |

---

## ✨ Contributing

Contributions are welcome! Please fork the repository and submit a pull request with a clear description of your changes.

```bash
# Fork & Clone
git clone https://github.com/ramgopal-reddy/FoodProductWebsite.git

# Create new branch
git checkout -b feature/RamGopalReddy

# Make changes and commit
git commit -m "Add your feature"

# Push and PR
git push origin feature/RamGopalReddy
```

---

## 🦾 License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for more details.

---

## 👨‍💼 Author

- **Your Name**
- GitHub: [https://github.com/ramgopal-reddy](https://github.com/ramgopal-reddy)
- Email: [redabothularamgopalreddy@gmail.com](mailto:redabothularamgopalreddy@gmail.com)

---

## 📬 Feedback

If you have any feedback or suggestions, feel free to [open an issue](https://github.com/ramgopal-reddy/FoodProductWebsite/issues) or send an email.

---

## 💡 Future Improvements

- Add shopping cart feature
- Implement lazy loading for images
- Improve accessibility (ARIA roles, screen reader support)
- Add PWA support

---
