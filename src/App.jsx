import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail"; // Create this if not yet done
import Header from "./components/Header";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="bg-[#fafafa]">
      {/* <header className="p-4 text-center">
        <h1 className="text-2xl font-bold">Food Products App</h1>
        <p className="text-sm">Explore and search for food products</p>
      </header> */}
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:code" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
