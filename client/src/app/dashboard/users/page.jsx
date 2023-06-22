"use client";
import axios from "axios";
import { useEffect, useState } from "react";

function users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");
    console.log(replaceToken);
    const res = await axios("http://localhost:8080/api/users", {
      headers: {
        Authorization: replaceToken,
      },
    });
    console.log(res.data);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
          <h1>{user.role}</h1>
        </div>
      ))}
    </div>
  );
}

export default users;
