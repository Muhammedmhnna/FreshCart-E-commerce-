import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes
} from "react-icons/fa";
import logo from "../../../assets/images/freshcart-logo.svg";
import { UserContext } from "../../../Context/UserContext";
import { CartContext } from "../../../Context/CartContext";
import { useMediaQuery } from "react-responsive";

export default function Navbar() {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const cartItemCount = cartItems?.numOfCartItems || 0;

  const logOut = () => {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/brands", name: "Brands" },
    { path: "/products", name: "Products" },
    { path: "/categories", name: "Categories" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, color: "hover:text-blue-600", url: "#" },
    { icon: <FaTwitter />, color: "hover:text-blue-400", url: "#" },
    { icon: <FaInstagram />, color: "hover:text-pink-600", url: "#" },
    { icon: <FaTiktok />, color: "hover:text-black", url: "#" },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <nav className="fixed bg-white top-0 left-0 right-0 z-50 shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                width={130}
                alt="Fresh Cart"
                className="h-auto transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {userLogin && (
              <div className="flex space-x-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-1 py-2 text-sm font-medium transition-colors duration-200 relative ${isActive
                        ? 'text-green-600 font-semibold'
                        : 'text-gray-700 hover:text-green-600'
                      }`
                    }
                  >
                    {link.name}
                    {({ isActive }) => isActive && (
                      <motion.div
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                        initial={false}
                      />
                    )}
                  </NavLink>
                ))}
              </div>
            )}

            {/* Icons */}
            {userLogin && (
              <div className="flex items-center space-x-6 ml-4">
                <NavLink
                  to="/wishList"
                  className="relative p-1 text-gray-700 hover:text-green-600 transition-colors duration-200"
                >
                  <FaHeart className="w-5 h-5" />
                </NavLink>

                <div className="relative">
                  <NavLink
                    to="/cart"
                    className="p-1 text-gray-700 hover:text-green-600 transition-colors duration-200"
                  >
                    <FaShoppingCart className="w-5 h-5" />
                    {cartItemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 -right-3 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {cartItemCount}
                      </motion.span>
                    )}
                  </NavLink>
                </div>
              </div>
            )}

            {/* Auth Links */}
            <div className="flex items-center space-x-6 border-l border-gray-200 pl-6 ml-4">
              {!userLogin ? (
                <>
                  <NavLink
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200 flex items-center gap-1"
                  >
                    <FaUser className="text-sm" /> Sign In
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <button
                  onClick={logOut}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200 gap-1"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              )}

              {/* Social Icons */}
              <div className="hidden lg:flex items-center space-x-4 ml-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`text-gray-500 ${social.color} transition-colors duration-200`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {userLogin && (
                <>
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium ${isActive
                          ? 'text-green-600 bg-green-50'
                          : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}

                  <NavLink
                    to="/wishList"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                  >
                    Wishlist
                  </NavLink>

                  <NavLink
                    to="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                  >
                    Cart
                    {cartItemCount > 0 && (
                      <span className="ml-2 bg-green-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                        {cartItemCount}
                      </span>
                    )}
                  </NavLink>
                </>
              )}

              <div className="pt-4 border-t border-gray-200">
                {!userLogin ? (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-4 py-2 text-center rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full mt-2 px-4 py-2 text-center rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      Register
                    </NavLink>
                  </>
                ) : (
                  <button
                    onClick={logOut}
                    className="flex items-center justify-center w-full px-4 py-2 text-center rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 gap-2"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                )}
              </div>

              <div className="flex justify-center space-x-6 pt-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`text-gray-500 ${social.color} text-lg`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}