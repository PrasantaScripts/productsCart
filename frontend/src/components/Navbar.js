import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../pages/CartContext";

const NavBar = () => {
  const { cart } = useContext(CartContext);

  return (
    <>
      <nav className="container mx-auto flex justify-between py-4 items-center">
        <Link to="/">
          <img style={{ height: 45 }} alt="peproni" src="/images/logo.png" />
        </Link>

        <ul className="flex  items-center">
          <li className="ml-6">
            <Link to="/">
              <b> Home</b>{" "}
            </Link>
          </li>
          <li className="ml-6">
            <Link to="/products">
              <b>Products</b>{" "}
            </Link>
          </li>
          <li className="ml-6">
            <Link to="/cart">
              <div
                style={{
                  background: "#f59e0d",
                  display: "flex",
                  padding: "6px",
                  borderRadius: "50px",
                }}>
                <span className="text-black">
                  {cart.totalItems ? cart.totalItems : 0}
                </span>
                <img className="ml-2" src="/images/cart.png" alt="cart"></img>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
