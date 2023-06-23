"use client";
import useLogoutUser from "@/hooks/useLogoutUser";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { logout } = useLogoutUser();
  const [userCart, setUserCart] = useState([]);
  const [price, setPrice] = useState(0);

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

  const clearUserCart = (userId) => {
    setUserCart([]);
    updateUserCart(userId, []);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
