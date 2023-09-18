import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Products from "./pages/ProductsPage.js";
import NavBar from "./components/Navbar.js";
import SingleProduct from "./pages/SingleProduct.js";
import { CartContext } from "./pages/CartContext.js";
import { getCart, storeCart } from "./pages/Storage.js";
import Cart from "./pages/Cart.js";

const App = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    // window.localStorage.getItem("cart");

    // const getData = JSON.parse(localStorage.getItem("cart"))
    // setCart(getData)
    // console.log('property', getData.items)
    // console.log(JSON.parse(cart));
    getCart().then((cart) => {
      setCart(JSON.parse(cart));
    });
    
  }, []);

  useEffect(() => {
    storeCart(JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        <NavBar />
        <Routes>
          <Route path="/" Component={Home}></Route>
          <Route path="/products" exact Component={Products}></Route>
          <Route path="/products/:_id" Component={SingleProduct}></Route>
          <Route path="/cart" Component={Cart}></Route>
        </Routes>
      </CartContext.Provider>
    </>
  );
};

export default App;
