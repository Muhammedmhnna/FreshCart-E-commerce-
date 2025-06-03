import React, { useEffect, useState } from "react";
import Style from "./AllOrders.module.css";
export default function AllOrders() {
  const [counter, setCounter] = useState(0);
  useEffect(() => { }, []);
  return (
    <div className="mt-20">
      <h1 className="font-bold text-slate-900 text-3xl"> Your All Orders</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
  );
}

