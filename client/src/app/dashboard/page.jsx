"use client";
import { withAuth } from "../../utils/withAuth";
import Statistics from "../../components/dashboard/Statistics";
import Slidebar from "../../components/dashboard/Slidebar";
import Incomes from "../../components/dashboard/Incomes";
import Users from "../../components/dashboard/Users";
import axios from "axios";
import { use, useEffect, useState } from "react";
import Productos from "@/components/dashboard/Productos";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { WrenchScrewdriverIcon } from "@heroicons/react/20/solid";
import AdminTestimonys from "@/components/dashboard/AdminTestimonys";
import { setMerchList } from "@/store/Slices/Merch";
import { setFilterList } from "@/store/Slices/Filters";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const { userId } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [showUsers, setShowUsers] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showTestimonys, setShowTestimonys] = useState(false);

  //* --------------- OBTENER USARIO LOGEADO ---------------
  const fetchUsers = async (id) => {
    const token = localStorage.getItem("token");
    const replaceToken = token.replace(/['"]+/g, "");

    const res = await axios(
      `https://ocean-allies-production.up.railway.app/api/users/${id}`,
      {
        headers: {
          Authorization: replaceToken,
        },
      }
    );
    console.log(res.data);
    setUser(res.data);
  };
  //* --------------- OBTENER USARIOS LOGEADO ---------------

  useEffect(() => {
    fetchUsers(userId);
  }, []);

  useEffect(() => {
    dispatch(
      setFilterList({
        page: 1,
        category: null,
        price: null,
        sort: null,
        size: null,
        name: "",
        color: null,
      })
    );
    console.log("cleaning filters");
  }, []);

  return (
    <div className="antialiased bg-black w-full pb-10 text-slate-300 relative py-4">
      <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl  my-5 px-2">
        <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4 ">
          <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">
            Dashboard<span className="text-indigo-400">.</span>
          </h1>
          <p className="text-slate-400 text-sm mb-2">Welcome back,</p>

          <div
            href="#"
            className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2  group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2"
          >
            {user.image ? (
              <img
                className="rounded-full w-10 h-10 relative object-cover"
                src={user.image}
                alt=""
              />
            ) : (
              <WrenchScrewdriverIcon className="rounded-full w-10 h-10 relative object-cover" />
            )}
            <div>
              <p className="font-medium  leading-4">{user.name}</p>
              <span className="text-xs text-slate-400">{user.email}</span>
            </div>
          </div>
          <hr className="my-2 border-slate-700" />
          <Slidebar
            setShowUsers={setShowUsers}
            setShowProducts={setShowProducts}
            setShowTestimonys={setShowTestimonys}
          />
          <p className="text-sm text-center text-gray-600">
            v1.0.0.0 | &copy; 2023 Ocean Allies
          </p>
        </div>
        <div id="content" className="bg-white/10 col-span-9 rounded-lg  p-6">
          {!showUsers && !showProducts && !showTestimonys && (
            <div className="flex flex-col items-center justify-center opacity-25">
              <h1 className="text-5xl lg:text-7xl font-bold text-center bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent mb-6">
                Ocean Allies.
              </h1>
              <img className="w-1/2 " src="/img/ocean.svg" alt="" />
            </div>
          )}
          {showTestimonys && <AdminTestimonys />}
          {showUsers && <Users />}
          {showProducts && <Productos />}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
