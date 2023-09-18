import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleProduct = () => {
  const [product, setproduct] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);

  useEffect(() => {
    fetch(`/api/products/${params._id}`)
      .then((res) => res.json())
      .then((product) => {
        setproduct(product);
      });
  }, [params._id]);

  return (
    <div className="container mx-auto mt-12 max-w-md shadow-md overflow-hidden ">
      <button
        className="mb-12 font-bold bg-green-500 rounded-full"
        onClick={() => {
            navigate(-1);
        }}>
        {" "}
        Back{" "}
      </button>
      <div className="flex">
        <img src={product.image} alt="pizza" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-center">{product.name}</h1>
        <div className="text-md rounded-full text-center">{product.size}</div>
        <div className="font-bold mt-2 text-center rounded-full bg-gray-300">
          {product.price}
        </div>
        <button className="bg-yellow-500 py-1 px-5 text-center rounded-full font-bold mt-4">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
