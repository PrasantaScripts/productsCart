import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {
  let total = 0;
  const { cart, setCart } = useContext(CartContext);
  // console.log('carts_cart',cart)

  const [products, setProducts] = useState([]);
  const [priceFetch, usepriceFetch] = useState(false);
  const getQuantity = (productId) => {
    return cart.items[productId];
  };

  const increment = (productId) => {
    const remaining = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] = remaining + 1;
    _cart.totalItems += 1;
    setCart(_cart);
    console.log("existing", _cart);
  };

  const decrement = (productId) => {
    const remaining = cart.items[productId];

    if (remaining === 1) {
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = remaining - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
    console.log("decr", _cart);
  };

  const getPrice = (productId, price) => {
    const sum = price * getQuantity(productId);
    total = sum + total;
    return sum;
  };

  const handleClick= (productId,price)=>{
    const _cart = {...cart}
    const totalItemNow = _cart.items[productId]
    delete _cart.items[productId]
    cart.totalItems-=totalItemNow
    setCart(_cart)
    const updatedProducts = products.filter((product)=>product._id !==productId)
    setProducts(updatedProducts)
  }
  const handleOrder = ()=>{
    alert('This webapplication will now on developement period --- still your order is being placed enjoy your food')
    setCart({});
    setProducts([]);
  }

  useEffect(() => {
    if (!cart.items) {
      return;
    }
    // console.log("cart_items", JSON.stringify(Object.keys(cart.items)));
    if (priceFetch) {
      return;
    }
    fetch("/api/products/cart-items", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) }),
    }).then((res) =>
      res.json().then((products) => {
        setProducts(products);
        usepriceFetch(true);
      })
    );
  }, [cart]);

  return products.length ? (
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart Items</h1>
      <ul>
        {products.map((product) => {
          return (
            <li className="mb-12" key={product._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="h-16" src={product.image} alt="" />
                  <span className="font-bold ml-4 w-48 ">{product.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      decrement(product._id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
                    -
                  </button>
                  <b className="px-4">{getQuantity(product._id)}</b>
                  <button
                    onClick={() => {
                      increment(product._id);
                    }}
                    className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
                    +
                  </button>
                </div>
                <span>{getPrice(product._id, product.price)}</span>
                <button onClick={()=>{handleClick(product._id,product.price)}} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right">
        <b>Grand Total:</b> {"$" + total}
      </div>
      <div className="text-right mt-6">
        <button onClick={handleOrder} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
          Order now
        </button>
      </div>
    </div>
  ) : (
    <img
      className="mx-auto w-1/2 mt-12"
      src="../images/empty-cart.png"
      alt=""
    />
  );
};

export default Cart;
