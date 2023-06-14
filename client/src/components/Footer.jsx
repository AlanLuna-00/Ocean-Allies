"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Footer = () => {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
            setShowFooter(isAtBottom);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <footer className={`fixed bottom-0 left-0 w-full bg-gray-800 text-gray-300 ${showFooter ? "" : "hidden"}`}>
            <div className="container mx-auto py-4">
                <nav className="flex justify-center">
                    <Link href="/home" className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                    <Link href="/about" className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
                    <Link href="/shop" className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
                    <Link href="/contact" className="text-gray-300 hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                </nav>
                <p className="text-center text-gray-300 mt-4">© Todos los derechos reservados</p>
            </div>
        </footer>
    );
};

export default Footer;