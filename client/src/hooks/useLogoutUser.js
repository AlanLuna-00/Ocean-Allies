import axios from "axios";
import { useRouter } from "next/navigation";

const useLogoutUser = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.SERVER}/api/auth/logout`
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Logout failed");
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return { logout };
};

export default useLogoutUser;
