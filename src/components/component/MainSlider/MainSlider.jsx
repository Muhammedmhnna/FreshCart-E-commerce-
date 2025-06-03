import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mainSlider1 from "../../../assets/images/slider-image-3.jpeg";
import mainSlider2 from "../../../assets/images/grocery-banner-2.jpeg";
import mainSlider3 from "../../../assets/images/grocery-banner.png";
import slide1 from "../../../assets/images/slider-image-1.jpeg";
import slide2 from "../../../assets/images/slider-image-2.jpeg";

export default function MainSlider() {
  const mainSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    fade: true,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    appendDots: dots => (
      <div className="absolute bottom-6 left-0 right-0">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <motion.div
        className="w-3 h-3 rounded-full bg-black bg-opacity-50"
        whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,1)" }}
        transition={{ duration: 0.2 }}
      />
    )
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  const sideImageVariants = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Main Slider */}
        <div className="w-full lg:w-3/4 relative rounded-2xl overflow-hidden shadow-xl">
          <Slider {...mainSettings}>
            {/* Slide 1 */}
            <div className="relative h-64 md:h-96 lg:h-[30rem]">
              <motion.img
                src={mainSlider1}
                className="w-full h-full object-cover"
                alt="Special Offers"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 10 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center pl-8 md:pl-16">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="text-white max-w-md"
                >
                  <motion.h2
                    className="text-3xl md:text-5xl font-bold mb-3"
                    variants={textVariants}
                  >
                    Summer Sale
                  </motion.h2>
                  <motion.p
                    className="text-lg md:text-xl mb-6"
                    variants={textVariants}
                  >
                    Up to 50% off on selected items
                  </motion.p>
                  <motion.button
                    className="bg-black text-primary px-8 py-3 rounded-full font-medium shadow-lg"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Shop Now
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="relative h-64 md:h-96 lg:h-[30rem]">
              <img
                src={mainSlider2}
                className="w-full h-full object-cover"
                alt="Fresh Groceries"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center pl-8 md:pl-16">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="text-white max-w-md"
                >
                  <motion.h2
                    className="text-3xl md:text-5xl font-bold mb-3"
                    variants={textVariants}
                  >
                    Fresh Arrivals
                  </motion.h2>
                  <motion.p
                    className="text-lg md:text-xl mb-6"
                    variants={textVariants}
                  >
                    Daily delivered organic products
                  </motion.p>
                  <motion.button
                    className="bg-black text-primary px-8 py-3 rounded-full font-medium shadow-lg"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Explore
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="relative h-64 md:h-96 lg:h-[30rem]">
              <img
                src={mainSlider3}
                className="w-full h-full object-cover"
                alt="Best Deals"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center pl-8 md:pl-16">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="text-white max-w-md"
                >
                  <motion.h2
                    className="text-3xl md:text-5xl font-bold mb-3"
                    variants={textVariants}
                  >
                    Best Deals
                  </motion.h2>
                  <motion.p
                    className="text-lg md:text-xl mb-6"
                    variants={textVariants}
                  >
                    Quality products at affordable prices
                  </motion.p>
                  <motion.button
                    className="bg-black text-primary px-8 py-3 rounded-full font-medium shadow-lg"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    View Offers
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </Slider>
        </div>

        {/* Side Images */}
        <div className="w-full lg:w-1/4 flex flex-col gap-5">
          <motion.div
            className="relative h-48 md:h-64 lg:h-[14.5rem] rounded-2xl overflow-hidden shadow-lg"
            whileHover="hover"
            variants={sideImageVariants}
          >
            <img
              src={slide1}
              className="w-full h-full object-cover"
              alt="Special Offer"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <h3 className="text-xl font-bold">Limited Time</h3>
                <p className="text-sm">Special discounts</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative h-48 md:h-64 lg:h-[14.5rem] rounded-2xl overflow-hidden shadow-lg"
            whileHover="hover"
            variants={sideImageVariants}
          >
            <img
              src={slide2}
              className="w-full h-full object-cover"
              alt="New Arrivals"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <h3 className="text-xl font-bold">New Arrivals</h3>
                <p className="text-sm">Discover now</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}