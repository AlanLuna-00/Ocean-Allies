"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
// import useDashboard from "@/hooks/useEditUser";
import axios from "axios";
import Link from "next/link";
import EditUsers from "@/components/dashboard/EditUsers";
import { UserIcon, WrenchScrewdriverIcon } from "@heroicons/react/20/solid"; // kausdfhksdjhfkhsdkjfsd



function Users() {
  const [users, setUsers] = useState([]);
  
  //* --------------- OBTENER USARIOS ---------------
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");
    
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
  

console.log('USUARIOSSSSSSSSS',users)


  return (
    <div id="last-users">

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
                    <span  className="ml-2 -mr-1 h-5 w-8 text-violet-200 ">                          
                        {user.image ? (
                            <Image
                              className="rounded-full h-8 object-cover"
                              src={user.image}
                              height={40}
                              width={40}
                              alt=""
                            />
                            ) : user.role === "admin" ? (
                                <WrenchScrewdriverIcon/>
                            ) : (
                                <UserIcon />
                            )
                        }
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

export default Users;
