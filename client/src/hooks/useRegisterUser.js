import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  showSuccessRegister,
  showErrorRegister,
} from "@/components/SweetAlerts";

// Hook para registro
const useRegister = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Hacer la petición al backend para registrar el usuario en la base de datos
      const response = await axios.post(
        "https://ocean-allies-production.up.railway.app/api/auth/register",
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role,
        }
      );

      if (response.status !== 201) {
        throw new Error(response.data.message || "Registration failed");
      }

      setIsLoading(false);
      router.push("/auth/login"); // Redireccionar al login después del registro
      setTimeout(() => {
        showSuccessRegister();
      }, 1000);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.response.data.msg || "Registration failed");
      showErrorRegister();
    }
  };

  const registerWithGoogle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Iniciar sesión con Google utilizando Firebase Authentication
      const auth = getAuth(); // Inicializar 'auth' aquí
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const { user } = result;

      // Hacer la petición al backend para registrar el usuario en la base de datos
      const response = await axios.post(
        "https://ocean-allies-production.up.railway.app/api/auth/register",
        {
          name: user.displayName,
          email: user.email,
          password: user.uid,
          role: "user",
          google: true,
          image: user.photoURL,
        }
      );

      if (response.status !== 201) {
        setError(response.data.message || "Registration failed");
      }

      setIsLoading(false);
      router.push("/auth/login"); // Redireccionar al login después del registro
      setTimeout(() => {
        showSuccessRegister();
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.msg || "Registration failed");
    }
  };

  return { register, registerWithGoogle, error, isLoading };
};

export default useRegister;
