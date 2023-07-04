import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function AdminTestimonys() {
  const [ testimonys, setTestimonys ] = useState([])

//* --------------- OBTENER TESTIMONIOS ---------------
    const fetchUsers = async () => {
      
      const res = await axios("http://localhost:8080/api/testimony");
      
      setTestimonys(res.data);
      return testimonys;
    };
  
//* --------------- OBTENER TESTIMONIOS ---------------
    useEffect(() => {
      fetchUsers();
    }, []);
//* --------------- BORRAR TESTIMONIOS ---------------
    const deleteUser = async (id) => {
      const token = localStorage.getItem("token");
      const replaceToken = token.replace(/['"]+/g, "");
  
      const res = await axios.delete(`http://localhost:8080/api/testimony/${id}`, {
        headers: {
          Authorization: replaceToken,
        },
      });
  
      fetchUsers();
    };
//* --------------- BORRAR TESTIMONIOS ---------------

//?-----------------------------------------------------------------------
  return (
    <div id="last-users">

      <div className="">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-black/60">
            <tr>
              <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
              <th className="text-left py-3 px-2">Comment</th>
              <th className="text-left py-3 px-2 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {testimonys?.map((testimony) => (
              <tr key={testimony.id} className="border-b border-gray-700">
                <td className="py-3 px-2 font-bold">
                  <div className="inline-flex space-x-3 items-center">
                    {/* <span  className="ml-2 -mr-1 h-5 w-8 text-violet-200 ">                          
                        {user.image ? (
                            <Image
                              className="rounded-full h-8 object-cover"
                              src={user.image}
                              height={40}
                              width={40}
                              alt=""
                            />
                            ) :  <UserIcon />
                        }
                    </span> */}
                    <span>{testimony.name}</span>
                  </div>
                </td>

                <td className="py-3 px-2 font-bold">
                  <div className="inline-flex space-x-3 items-center">
                    <span>{testimony.comment}</span>
                  </div>
                </td>

                <td className="py-3 px-2">
                  <div className="inline-flex items-center space-x-3">
                    {/* -----------------------ACTIVAR O NO ---------------------- */}
                    {testimony.active ? (
                      <Link
                      href=""
                      title="Suspend user"
                      className="hover:text-white "
                      onClick={() => {
                        deleteUser(testimony.id); //!-------------------------------------
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
                        deleteUser(testimony.id) //!-------------------------------------
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
  )
}
