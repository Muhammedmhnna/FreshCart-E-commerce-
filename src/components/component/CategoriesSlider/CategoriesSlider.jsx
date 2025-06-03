import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoriesSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  if (loading) {
    return (
      <div className="py-5">
        <h2 className="py-4 text-gray-800 font-medium text-xl">Shop Popular Categories</h2>
        <div className="flex space-x-4 overflow-hidden">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="min-w-[100px]">
              <div className="bg-gray-200 rounded-lg h-24 w-full animate-pulse"></div>
              <div className="bg-gray-200 h-4 w-3/4 mt-2 mx-auto animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-4 text-gray-800 font-semibold text-2xl md:text-3xl"
      >
        Shop Popular Categories
      </motion.h2>

      <Slider {...settings}>
        {categories.map((category, index) => (
          <motion.div
            key={category.id || index}
            variants={categoryVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="px-2"
          >
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="relative rounded-full overflow-hidden w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-md group-hover:shadow-lg">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />
              </div>
              <h3 className="mt-3 text-center font-medium text-gray-700 group-hover:text-primary transition-colors duration-300 text-sm sm:text-base">
                {category.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
}