import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching categories. Please try again later.");
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCategories();
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
    <div className="py-5">
      <div className="flex justify-center items-center m-8 p-5 ml-10 px-10 py-10">
        <p className="text-gray-600 text-lg mt-2 font-semibold">
          Discover a variety of categories. Whether you're looking for the
          latest fashion trends, home essentials, or tech gadgets, we have
          something for everyone. Browse through our diverse categories and find
          exactly what you need. Start shopping today and enjoy an amazing
          shopping experience with us!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="text-center bg-white rounded-lg shadow-md p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:translate-y-2"
          >
            <div className="w-full h-40 overflow-hidden rounded-md">
              <img
                className="w-full h-full object-contain"
                src={category.image}
                alt={category.name}
              />
            </div>
            <h3 className="font-medium text-gray-700 mt-2">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

