import { useEffect, useState } from "react";

function Name({ title }) {

  const productName = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => setData(data.products));
    }, []);
  }

  return (
    <div className="name">
      <h1>John Doe {title}</h1>
      <h2>Web Developer</h2>
      <h3>CSS and HTML</h3>
    </div>
  );
}

export default Name;
// This component displays a name and title.
