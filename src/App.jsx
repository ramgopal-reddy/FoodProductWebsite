import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail"; // Create this if not yet done

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:code" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
