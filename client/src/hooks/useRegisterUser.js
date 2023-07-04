import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
        "http://localhost:8080/api/auth/register",
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
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.response.data.msg || "Registration failed");
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

      console.log("me ejec hook");
      // Hacer la petición al backend para registrar el usuario en la base de datos
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
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
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.msg || "Registration failed");
    }
  };

  return { register, registerWithGoogle, error, isLoading };
};

export default useRegister;
