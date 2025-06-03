import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  let navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-5">
      <h1 className="text-green-600 text-5xl font-semibold">404</h1>
      <p className="text-black text-xl mt-3">
        Oops! This Page Could Not Be Found
      </p>
      <p className="text-black text-lg mt-2 text-center">
        Sorry but the page you are looking for does not exist, have been
        removed, name changed or is temporarily unavailable.
      </p>
    </div>
  );
}

