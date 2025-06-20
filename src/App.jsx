import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Pages/Home/Home.jsx";
import Layout from "./components/Pages/Layout/Layout.jsx";
import Categories from "./components/Pages/Categories/Categories.jsx";
import Products from "./components/Pages/Products/Products.jsx";
import Register from "./components/Pages/Register/Register.jsx";
import NotFound from "./components/component/NotFound/NotFound.jsx";
import Cart from "./components/Pages/Cart/Cart.jsx";
import Login from "./components/Pages/Login/Login.jsx";
import Brands from "./components/Pages/Brands/Brands.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import ProtectedRoute from "./components/component/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./components/Pages/ProductDetails/ProductDetails.jsx";
import CheckOut from "./components/Pages/Checkout/Checkout.jsx";
import AllOrders from "./components/Pages/AllOrders/AllOrders.jsx";
import WishList from "./components/Pages/WishList/WishList.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";

import { Toaster } from "react-hot-toast";
import WishListContextProvider from "./Context/WishlistContext.jsx";


let query = new QueryClient();
let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkOut",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <WishListContextProvider>
        <CartContextProvider>
          <QueryClientProvider client={query}>
            <UserContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <Toaster />
              <ReactQueryDevtools />
            </UserContextProvider>
          </QueryClientProvider>
        </CartContextProvider>
      </WishListContextProvider>

      ;
    </>
  );
}

export default App;

