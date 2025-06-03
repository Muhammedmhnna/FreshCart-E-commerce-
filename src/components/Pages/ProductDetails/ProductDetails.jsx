import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import Slider from "react-slick";
import CartContextProvider, { CartContext } from "../../../Context/CartContext";
import toast from "react-hot-toast";
export default function ProductDetails() {
  let { addToCart } = useContext(CartContext);
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { id, category } = useParams();

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }

  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        const allProducts = data.data;
        const related = allProducts.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(related);
      })
      .catch((error) => {
        console.error("Error fetching Related Products:", error);
      });
  }

  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category);
  }, [id, category]);

  return (
    <div>
      <div className="row">
        <div className="w-1/4">
          {Array.isArray(productDetails?.images) &&
          productDetails?.images.length > 1 ? (
            <Slider {...settings}>
              {productDetails?.images.map((src, index) => (
                <img
                  key={index}
                  className="w-full"
                  src={src}
                  alt={productDetails?.title}
                />
              ))}
            </Slider>
          ) : (
            <img
              src={productDetails?.images[0]}
              className="w-full"
              alt={productDetails?.title}
            />
          )}
        </div>
        <div className="w-3/4 p-6">
          <h1 className="text-lg font-normal text-gray-950">
            {productDetails?.title}
          </h1>
          <p className="text-gray-700 font-light mt-4">
            {productDetails?.description}
          </p>
          <div className="flex my-4 justify-between items-center">
            <span>{productDetails?.price} EGP</span>
            <span>
              {productDetails?.ratingsAverage}
              <FaStar className="text-yellow-500" />
            </span>
          </div>

          <button
            onClick={() => addProductToCart(productDetails.id)}
            className="btn"
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="row">
        {relatedProducts.map((product) => (
          <div className="w-1/6 m-2 p-4" key={product.id}>
            <div className="product py-4">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img
                  className="w-full"
                  src={product.imageCover}
                  alt={product.title}
                />
                <span className="block font-light mt-2 text-green-600">
                  {product.category.name}
                </span>
                <h3 className="text-lg font-normal text-gray-800 mb-4">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between items-center">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}{" "}
                    <FaStar className="text-yellow-500" />
                  </span>
                </div>
                <button
                  onClick={() => addProductToCart(productDetails.id)}
                  className="btn"
                >
                  Add to cart
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

