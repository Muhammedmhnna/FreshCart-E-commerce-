import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaShoppingCart, FaHeart, FaRegHeart, FaFire, FaBolt } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { motion } from "framer-motion";
import useProducts from "../../../Hooks/useProducts";
import { CartContext } from "../../../Context/CartContext";
import { toast } from "react-toastify";
import { WishListContext } from "../../../Context/WishlistContext";

export default function Products() {
  const { addToCart, cartItems } = useContext(CartContext);
  const { wishList, wishListItems, removeFromWishList } = useContext(WishListContext);
  const [quickView, setQuickView] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const safeWishListItems = Array.isArray(wishListItems) ? wishListItems : [];

  async function handleWishList(productId, e) {
    e.preventDefault();
    try {
      if (safeWishListItems.includes(productId)) {
        await removeFromWishList(productId);
        toast.success("Removed from wishlist");
      } else {
        await wishList(productId);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
      console.error("Wishlist error:", error);
    }
  }

  async function handleAddToCart(productId, e) {
    e.preventDefault();
    setAddingToCart(productId);
    try {
      const response = await addToCart(productId);
      if (response?.status === "success") {
        toast.success("Product added to cart!");
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error("Cart error:", error);
    } finally {
      setAddingToCart(null);
    }
  }

  const { data, isError, error, isLoading } = useProducts();

  if (isError) {
    return (
      <div className="py-12 w-full flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-red-100 p-6 rounded-full mb-4">
          <FaFire className="text-red-500 text-3xl" />
        </div>
        <h3 className="text-red-600 text-2xl font-bold mb-2">Oops!</h3>
        <p className="text-gray-600 max-w-md text-center">
          {error.message || "We couldn't load the products. Please try again later."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-4 rounded-full">
            <FaBolt className="text-white text-2xl" />
          </div>
        </motion.div>
      </div>
    );
  }

  if (!data?.data?.data?.length) {
    return (
      <div className="py-12 w-full flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-emerald-100 p-6 rounded-full mb-4">
          <FaShoppingCart className="text-emerald-500 text-3xl" />
        </div>
        <h3 className="text-gray-800 text-2xl font-bold mb-2">No Products Found</h3>
        <p className="text-gray-600 max-w-md text-center">
          We couldn't find any products matching your criteria. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-4 md:p-6">
      {data.data.data.map((product) => {
        const isInWishlist = safeWishListItems.includes(product.id);
        const isInCart = safeCartItems.some(item => item.product === product.id);
        const discountPercentage = product.priceAfterDiscount
          ? Math.round(100 - (product.priceAfterDiscount / product.price * 100))
          : 0;

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className="relative group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* Product Image with Hover Effects */}
            <Link
              to={`/productdetails/${product.id}/${product.category.name}`}
              className="block relative"
              onMouseEnter={() => setQuickView(product.id)}
              onMouseLeave={() => setQuickView(null)}
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={product.imageCover}
                  alt={product.title}
                  loading="lazy"
                />

                {/* Quick View Overlay */}
                {quickView === product.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="bg-white text-emerald-600 font-bold px-4 py-2 rounded-full text-sm"
                    >
                      Quick View
                    </motion.div>
                  </motion.div>
                )}
              </div>

              {/* Discount Ribbon */}
              {discountPercentage > 0 && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  {discountPercentage}% OFF
                </div>
              )}

              {/* Top Rated Badge */}
              {product.ratingsAverage >= 4.5 && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center">
                  <FaStar className="mr-1" /> Top Rated
                </div>
              )}
            </Link>

            {/* Product Info */}
            <div className="p-4">
              <span className="block text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                {product.category.name}
              </span>
              <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                {product.title}
              </h3>

              {/* Price Section */}
              <div className="mb-3">
                {product.priceAfterDiscount ? (
                  <div className="flex items-end space-x-2">
                    <span className="text-lg font-bold text-emerald-600">
                      {product.priceAfterDiscount} EGP
                    </span>
                    <span className="text-xs text-gray-500 line-through">
                      {product.price} EGP
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    {product.price} EGP
                  </span>
                )}
              </div>

              {/* Rating Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex mr-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${i < Math.floor(product.ratingsAverage) ? 'text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.ratingsQuantity})
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {product.sold || 0} sold
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex border-t border-gray-100">
              <button
                onClick={(e) => handleWishList(product.id, e)}
                className={`flex-1 py-3 flex items-center justify-center transition-colors
                  ${isInWishlist ? 'bg-rose-50 text-rose-500' : 'bg-gray-50 text-gray-400 hover:text-rose-500'}`}
                disabled={addingToCart === product.id}
              >
                {isInWishlist ? (
                  <FaHeart className="text-lg" />
                ) : (
                  <FaRegHeart className="text-lg" />
                )}
                <span className="ml-2 text-xs font-medium hidden sm:inline">
                  {isInWishlist ? 'Saved' : 'Save'}
                </span>
              </button>

              <button
                onClick={(e) => handleAddToCart(product.id, e)}
                className={`flex-1 py-3 flex items-center justify-center transition-colors
                  ${isInCart ?
                    'bg-emerald-100 text-emerald-700' :
                    'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'}
                  ${addingToCart === product.id ? 'opacity-70' : ''}`}
                disabled={addingToCart === product.id}
              >
                {addingToCart === product.id ? (
                  <ThreeDots
                    visible={true}
                    height="20"
                    width="20"
                    color="#ffffff"
                    ariaLabel="three-dots-loading"
                  />
                ) : (
                  <>
                    <FaShoppingCart className="text-lg" />
                    <span className="ml-2 text-xs font-medium hidden sm:inline">
                      {isInCart ? 'Added' : 'Add to Cart'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}