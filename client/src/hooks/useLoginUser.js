import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AuthContext from "../context/AuthContext";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const useLogin = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useContext(AuthContext);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // Iniciar sesión con Firebase Authentication
      const auth = getAuth();

      // Hacer la petición al backend para iniciar sesión
      const response = await axios.post(
        "https://ocean-allies-production.up.railway.app/api/auth/login",
        {
          email: credentials.email,
          password: credentials.password,
        }
      );



      if (response.status === 206) {
        setError(response.data.msg);
      }

      // Guardar datos del usuario en el store
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsLoading(false);
      handleLogin(response.data.user);
      router.push("/home"); // Redireccionar al home después del inicio de sesión
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.msg || "Registration failed");
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Iniciar sesión con Google utilizando Firebase Authentication
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      // Hacer la petición al backend para obtener el token JWT
      const response = await axios.post(
        "https://ocean-allies-production.up.railway.app/api/auth/login",
        {
          id: auth.currentUser.uid,
          email: auth.currentUser.email,
          password: "", // No se necesita contraseña cuando se utiliza el inicio de sesión de Google
          google: true,
          //image: auth.currentUser.photoURL,
        }
      );


      // Guardar datos del usuario en el store

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsLoading(false);
      handleLogin(response.data.user);
      router.push("/home"); // Redireccionar al home después del inicio de sesión
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error.response.data.msg);
    }
  };

  return { login, loginWithGoogle, error, isLoading };
};

export default useLogin;
