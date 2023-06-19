import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserData } from "@/store/Slices/Users/Index";

// Hook para inicio de sesión
const useLogin = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Login failed");
      }

      // Guardar datos del usuario en el store
      console.log(response.data);
      dispatch(setUserData(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setIsLoading(false);
      router.push("/home"); // Redireccionar al home después del inicio de sesión
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { login, error, isLoading };
};

export default useLogin;
