import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../../../Context/CartContext";
import { WishListContext } from "../../../Context/WishListContext";

export default function RecentProducts() {
  const { addToCart } = useContext(CartContext);
  const { wishList, wishListItems } = useContext(WishListContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");

  async function addToWishList(productId) {
    await wishList(productId);
  }

  async function addProductToCart(productId) {
    await addToCart(productId);
  }

  function getRecentProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecentProducts,
    staleTime: 80000,
    select: (data) => data.data.data,
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-8 w-full flex justify-center"
      >
        <h3 className="text-red-900 text-2xl md:text-4xl">{error.message}</h3>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen"
      >
        <ThreeDots visible={true} height="80" width="80" color="#4fa94d" />
      </motion.div>
    );
  }

  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.ratingsAverage - a.ratingsAverage;
      default:
        return 0;
    }
  });

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="w-full md:w-auto">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full md:w-48 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {sortedProducts?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <h3 className="text-2xl font-medium text-gray-600">No products found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <AnimatePresence>
            {sortedProducts?.map((product) => (
              <motion.div
                key={product.id}
                variants={productVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                exit={{ opacity: 0 }}
                layout
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-green-100 transition-all"
              >
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <div className="relative">
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToWishList(product.id);
                        }}
                        className={`p-2 rounded-full ${wishListItems?.includes(product.id)
                          ? "text-red-500 bg-white shadow-md"
                          : "text-gray-400 bg-white bg-opacity-80 hover:text-red-500"}`}
                      >
                        <FaHeart className="text-lg" />
                      </button>
                    </div>
                    <div className="aspect-square overflow-hidden">
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        src={product.imageCover}
                        alt={product.title}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="block text-xs font-medium text-green-600 uppercase tracking-wide">
                      {product.category.name}
                    </span>
                    <h3 className="text-sm font-medium text-gray-800 mt-1 truncate">
                      {product.title}
                    </h3>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold text-gray-900">
                        {product.price.toLocaleString()} EGP
                      </span>
                      <span className="flex items-center text-sm bg-green-50 px-2 py-1 rounded">
                        {product.ratingsAverage.toFixed(1)}{" "}
                        <FaStar className="text-yellow-500 ml-1 text-xs" />
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="px-4 pb-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addProductToCart(product.id);
                    }}
                    className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaShoppingCart className="text-sm" />
                    <span className="text-sm font-medium">Add to Cart</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}