import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../../../Context/CartContext";
import { WishListContext } from "../../../Context/WishListContext";
import { FaStar, FaShoppingCart, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function WishList() {
  const { addToCart } = useContext(CartContext);
  const { wishLists, removeFromWishList } = useContext(WishListContext);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishList(productId);
    toast.success("Removed from wishlist");
  };

  if (wishLists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <span className="text-5xl mb-4">❤️</span>
        <h3 className="text-2xl font-medium text-gray-800 mb-2">Your wishlist is empty</h3>
        <p className="text-gray-600 max-w-md mb-6">Start adding items you love to your wishlist</p>
        <Link
          to="/products"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.2 }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Wishlist</h1>
        <p className="text-gray-600 mt-2">
          {wishLists.length} {wishLists.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <AnimatePresence>
          {wishLists.map((product) => (
            <motion.div
              key={product._id}
              variants={productVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              className="relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-green-100 transition-all"
            >
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <FaTrash className="text-red-400" />
                </button>
              </div>

              <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                <div className="aspect-square overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    src={product.imageCover}
                    alt={product.title}
                    loading="lazy"
                  />
                </div>
              </Link>

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

                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}