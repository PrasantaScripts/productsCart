import React from "react";
import Product from "../components/Product";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../pages/CartContext";

const Products = () => {
  const { name } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((products) => {
        // console.log(products);
        setProducts(products);
      });
  }, []);

  return (
    <div className="container mx-auto pb-24">
      <h1 className="text-lg font-bold my-8">Products{name}</h1>
      <div className="grid grid-cols-6 gap-24 my-8">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
