import React, { useEffect, useState } from "react";
import Style from "./Home.module.css";
import RecentProducts from "../../Pages/RecentProducts/RecentProducts";
import CategoriesSlider from "../../component/CategoriesSlider/CategoriesSlider";
import MainSlider from "../../component/MainSlider/MainSlider";

export default function Home() {
  const [counter, setCounter] = useState(0);
  useEffect(() => { }, []);
  return (
    <div>
      <MainSlider />
      <CategoriesSlider />
      <RecentProducts />
    </div>
  );
}

