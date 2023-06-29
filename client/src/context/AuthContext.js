"use client";
import useLogoutUser from "@/hooks/useLogoutUser";
import React, { createContext, useEffect, useState, useContext } from "react";
import { FirebaseContext } from "./FirebaseContext";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { logout } = useLogoutUser();
  const [userCart, setUserCart] = useState([]);
  const [price, setPrice] = useState(0);
  const router = useRouter();
  const { auth } = useContext(FirebaseContext);

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

  const loadUserCart = (userId) => {
    const cartItems = JSON.parse(localStorage.getItem(`cart_${userId}`));
    if (cartItems) {
      setUserCart(cartItems);
    }
  };

  const updateUserCart = (userId, cart) => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  };

  const addToCart = (product, userId) => {
    setUserCart((prevCart) => [...prevCart, product]);
    updateUserCart(userId, [...userCart, product]);
  };

  const removeFromCart = (productId, userId) => {
    setUserCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    updateUserCart(
      userId,
      userCart.filter((item) => item.id !== productId)
    );
  };

  const clearUserCart = () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    setUserCart([]);
    updateUserCart(userId, []);
  };

  const getPurchaseData = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    for (const item of userCart) {
      const productId = item.id;
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
          "http://localhost:8080/api/purchase",
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

  // calculate total price of cart
  useEffect(() => {
    let total = 0;
    userCart.forEach((item) => {
      const sizes = Object.values(item.sizes);
      const quantity = sizes.reduce((acc, curr) => acc + curr, 0);
      total += item.price * quantity;
    });
    setPrice(total);
  }, [userCart]);

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
