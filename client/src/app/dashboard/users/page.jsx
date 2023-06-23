"use client";
import { useState, useEffect } from "react";
import useDashboard from "@/hooks/useDashboard";
import axios from "axios";
import Link from "next/link";
import EditUsers from "@/components/dashboard/EditUsers";

function User() {
  const [users, setUsers] = useState([]);
  
  //* --------------- OBTENER USARIOS ---------------
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");
    
    console.log('REPLACE TOKEN', replaceToken);
    const res = await axios("http://localhost:8080/api/users", {
      headers: {
        Authorization: replaceToken,
      },
    });
    
    setUsers(res.data);
    return users;
  };

  //* --------------- OBTENER USARIOS ---------------
  useEffect(() => {
    fetchUsers();
  }, []);
  //* --------------- BORRAR USUARIO ---------------
  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");

    const res = await axios.delete(`http://localhost:8080/api/users/${id}`, {
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
      `http://localhost:8080/api/users/${id}`,
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
  //   * --------------- EDITAR USUARIO ---------------
  const updateUser = async (id, name, email, role) => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");

    const res = await axios.put(
      `http://localhost:8080/api/users/${id}`,
      {
        name: name,
        email: email,
        role: role,
      },
      {
        headers: {
          Authorization: replaceToken,
        },
      }
    );
    fetchUsers();
  };
  
//   * --------------- EDITAR USUARIO ---------------

  return (
    <div id="last-users">

      <h1 className="font-bold py-4 uppercase">Last 24h users</h1>
      <div className="overflow-x-scroll">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-black/60">
            <tr>
              <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
              <th className="text-left py-3 px-2">Email</th>
              <th className="text-left py-3 px-2">Role</th>
              <th className="text-left py-3 px-2">Status</th>
              <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="py-3 px-2 font-bold">
                  <div className="inline-flex space-x-3 items-center">
                    <span>
                      <img
                        className="rounded-full w-8 h-8"
                        src={user.avatar}
                        alt=""
                      />
                    </span>
                    <span>{user.name}</span>
                  </div>
                </td>

                <td className="py-3 px-2">{user.email}</td>

                <td className="py-3 px-2">{user.role}</td>

                <td className="py-3 px-2">
                  {user.active ? "Active" : "Inactive"}
                </td>
                <td className="py-3 px-2">
                  <div className="inline-flex items-center space-x-3">
                    {/* -----------------------EDITAR ---------------------- */}
                    <EditUsers user={user} updateUser={updateUser}/>

                    {/* -----------------------BORRAR ---------------------- */}
                    {user.active ? (
                      <Link
                      href=""
                      title="Suspend user"
                      className="hover:text-white "
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="red"
                          className="w-5 h-5"
                          >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                        </svg>
                      </Link>
                    ) : (
                      <Link
                      href=""
                      title="Suspend user"
                      className="hover:text-white"
                      onClick={() => {
                          activateUser(user.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="green"
                          className="w-5 h-5"
                          >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                            />
                        </svg>
                      </Link>
                    )}
                    {/* ^^^^^^^^^^^^^^^^^^^^^^^^ BORRAR ^^^^^^^^^^^^^^^^^^^^^^^^ */}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
