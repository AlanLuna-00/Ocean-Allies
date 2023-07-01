"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import { FirebaseContext } from "./FirebaseContext";
import axios from "axios";
import useLogoutUser from "@/hooks/useLogoutUser";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { logout } = useLogoutUser();
  const [userCart, setUserCart] = useState([]);
  const [price, setPrice] = useState(0);
  const router = useRouter();
  const { auth } = useContext(FirebaseContext);
  const [change, setChange] = useState(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setIsAdmin(user.role === "admin");
    loadUserCart(user.id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    logout();
    clearUserCart();
    router.push("/auth/login");
  };

  const loadUserCart = async (userId) => {
    try {
      const response = await axios.get(
        `https://ocean-allies-production.up.railway.app/api/cart/${userId}`
      );
      setUserCart(response.data.cart.cartItems);
      setPrice(response.data.total);
      console.log("me ejecuto");
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (product, userId) => {
    try {
      const add = await axios.post(
        `https://ocean-allies-production.up.railway.app/api/cart/${userId}`,
        {
          ...product,
        }
      );
      setPrice(add.data.total);
      const response = await axios.get(
        `https://ocean-allies-production.up.railway.app/api/cart/${userId}`
      );
      setUserCart(response.data.cartItems);
      setChange(!change);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (itemId, userId) => {
    try {
      await axios.delete(
        `https://ocean-allies-production.up.railway.app/api/cart/${itemId}`
      );
      const response = await axios.get(
        `https://ocean-allies-production.up.railway.app/api/cart/${userId}`
      );
      setUserCart(response.data.cartItems);
      setPrice(response.data.total);
      setChange(!change);
    } catch (error) {
      console.error(error);
    }
  };

  const clearUserCart = async () => {
    try {
      await axios.delete(
        `https://ocean-allies-production.up.railway.app/api/cart/${auth.currentUser.uid}`
      );
      setUserCart([]);
      setPrice(0);
      setChange(!change);
    } catch (error) {
      console.error(error);
    }
  };

  const getPurchaseData = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    for (const item of userCart) {
      const productId = item.productId;
      let sizes = [];

      if (typeof item.sizes === "object") {
        sizes = Object.entries(item.sizes).map(([size, quantity]) => ({
          size,
          quantity,
        }));
      }

      console.log({
        userId,
        productId,
        sizes,
      });

      try {
        const response = await axios.post(
          `https://ocean-allies-production.up.railway.app/api/purchase`,
          {
            userId,
            productId,
            sizes,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      loadUserCart(loggedInUser.id);
    }
  }, [change]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      handleLogin(loggedInUser);
    }
  }, []);

  const value = {
    isLoggedIn,
    isAdmin,
    handleLogin,
    handleLogout,
    userCart,
    addToCart,
    removeFromCart,
    clearUserCart,
    loadUserCart,
    price,
    getPurchaseData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
