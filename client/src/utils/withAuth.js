"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export function withAuth(Component) {
  return function WithAuth(props) {
    const { isLoggedIn, isAdmin } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn || !isAdmin) {
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      }
    }, [isLoggedIn, isAdmin, router]);

    if (!isLoggedIn || !isAdmin) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Access denied, you are not ADMIN
          </h1>
          <p className="text-lg text-gray-500">Redirecting to Home....</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
