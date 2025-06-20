import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishLists, setWishLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getWishList() {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setIsLoading(false); // إيقاف اللودر لو مفيش توكن
      return;
    }

    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token },
        }
      );
      setWishLists(data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setError("Failed to fetch wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  async function wishList(productId) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("You need to log in first");
      return;
    }

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: { token },
        }
      );
      toast.success("Product added to your wish list", { duration: 3000 });
      getWishList();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add product to wishlist");
    }
  }

  async function removeFromWishList(productId) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("You need to log in first");
      return;
    }

    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: { token },
        }
      );
      toast.success("Product removed from your wishlist", { duration: 3000 });
      getWishList();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove product from wishlist");
    }
  }

  useEffect(() => {
    getWishList();
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
    <WishListContext.Provider
      value={{
        wishLists,
        wishList,
        removeFromWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}

