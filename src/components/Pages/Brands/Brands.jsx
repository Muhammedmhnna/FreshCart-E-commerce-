import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function getBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setBrands(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Brands:", error);
        setError("Failed to load brands. Please try again later.");
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getBrands();
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
    <div className="container mx-auto py-12 px-4 mt-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-md">
              <img
                className="w-32 h-32 object-contain"
                src={brand.image}
                alt={brand.name}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mt-4 text-center">
              {brand.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

