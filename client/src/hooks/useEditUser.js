import { useEffect, useState } from "react";
import axios from "axios";

//* --------------- OBTENER USARIOS ---------------
const useDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");

    console.log("REPLACE TOKEN", replaceToken);
    const res = await axios(`${process.env.SERVER}/api/users`, {
      headers: {
        Authorization: replaceToken,
      },
    });

    setUsers(res.data);
    return users;
  };

  //   useEffect(() => {
  //     fetchUsers();
  //   }, []);
  //* --------------- OBTENER USARIOS ---------------
  //* --------------- BORRAR USUARIO ---------------
  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");

    const res = await axios.delete(`${process.env.SERVER}/api/users/${id}`, {
      headers: {
        Authorization: replaceToken,
      },
    });

    fetchUsers();
  };
  //* --------------- BORRAR USUARIO ---------------
  //* --------------- ACTIVAR USUARIO ---------------
  const activateUser = async (id) => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");

    const res = await axios.put(
      `${process.env.SERVER}/api/users/${id}`,
      {
        active: true,
      },
      {
        headers: {
          Authorization: replaceToken,
        },
      }
    );
    fetchUsers();
  };
  //   * --------------- ACTIVAR USUARIO ---------------

  return { fetchUsers, deleteUser, activateUser };
};

export default useDashboard;
