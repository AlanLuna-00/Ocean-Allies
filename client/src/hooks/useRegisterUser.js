import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Hook para registro
const useRegister = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        userData
      );

      if (response.status !== 201) {
        throw new Error(response.data.message || "Registration failed");
      }

      setIsLoading(false);
      router.push("/auth/login"); // Redireccionar al login después del registro
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { register, error, isLoading };
};

export default useRegister;
