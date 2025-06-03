import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../../Context/CartContext";
import shoppingImage from "../../../assets/images/ShoppinImage.svg";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
export default function Cart() {
  let { getCartItems, updateProductCount, deleteProduct } =
    useContext(CartContext);
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function getCart() {
    let { data } = await getCartItems();
    setCart(data);
    setIsLoading(false);
  }
  async function updateCart(productId, count) {
    if (count > 1) {
      let { data } = await updateProductCount(productId, count);
      setCart(data);
      setIsLoading(false);
    } else {
      deleteCartProduct(productId);
    }
  }
  async function deleteCartProduct(productId) {
    let { data } = await deleteProduct(productId);
    setCart(data);
    setIsLoading(false);
  }
  useEffect(() => {
    getCart();
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDots visible={true} height="80" width="80" color="#4fa94d" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }
  return (
    <>
      {cart ? (
        cart.products.length > 0 ? (
          <div className="relative overflow-x-auto w-full mx-auto mt-20">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-900">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.products.map((products) => {
                  return (
                    <tr
                      key={products.product.id}
                      className="bg-white border-b hover:bg-gray-100 text-black"
                    >
                      <td className="p-4">
                        <img
                          src={products.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {products.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateCart(
                                products.product.id,
                                products.count - 1
                              )
                            }
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:text-gray-400 dark:border-gray-200 dark:hover:bg-gray-100 dark:hover:border-gray-600 "
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span>{products.count}</span>
                          </div>
                          <button
                            onClick={() =>
                              updateCart(
                                products.product.id,
                                products.count + 1
                              )
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:text-gray-400 dark:border-gray-200 dark:hover:bg-gray-100 dark:hover:border-gray-600 "
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 ">
                        {products.price} EGP
                      </td>
                      <td className="">
                        <button
                          onClick={() => deleteCartProduct(products.product.id)}
                          className="text-red-600 hover:text-red-900 "
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="w-full 4 rounded-lg shadow-lg mt-5 p-7  bg-white">
              <h2 className="text-xl font-bold mb-4  text-black">Summary</h2>
              <div className="flex justify-between mb-2  text-black">
                <span>shipping:</span>
                <span>20 EGP</span>
              </div>
              <div className="flex justify-between mb-2  text-black">
                <span>Taxes:</span>
                <span>5 EGP</span>
              </div>
              <div className="flex justify-between mb-2  text-black">
                <span>Total:</span>
                <span>{cart.totalCartPrice} EGP</span>
              </div>
              <button className="w-full  bg-green-600 text-white font-bold py-2 rounded hover:bg-green-500 transition duration-300">
                <Link to={"/checkout"}>Check Out</Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="w-64 h-auto">
              <img src={shoppingImage} alt="Shopping" />
            </div>
            <div className="flex justify-center text-center">
              <h1 className="text-gray-700 p-5">Cart's Feeling Light</h1>
            </div>
            <div className="text-gray-700 p-5">
              Your cart is longing for some company. Begin your shopping
              adventure now!
            </div>
            <div className="flex justify-center mt-10">
              <button
                onClick={() => navigate("/products")}
                className="bg-green-600 text-white hover:bg-green-500 transition duration-300 p-3"
              >
                EXPLORE OUR PRODUCTS
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="flex justify-center text-center mt-7">
          {/* <Loader /> */}
        </div>
      )}
    </>
  );
}

