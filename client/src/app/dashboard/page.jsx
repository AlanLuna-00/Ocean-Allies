"use client";
import { withAuth } from "../../utils/withAuth";
import Statistics from "../../components/dashboard/Statistics";
import Slidebar from "../../components/dashboard/Slidebar";
import Incomes from "../../components/dashboard/Incomes";
import Users from "../../components/dashboard/Users";

const Dashboard = () => {
  return (
    <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
      <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
        <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4 ">
          <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">
            Dashboard<span className="text-indigo-400">.</span>
          </h1>
          <p className="text-slate-400 text-sm mb-2">Welcome back,</p>
          <a
            href="#"
            className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2"
          >
            <div>
              <img
                className="rounded-full w-10 h-10 relative object-cover"
                src="/img/Seba.jpg"
                alt=""
              />
            </div>
            <div>
              <p className="font-medium group-hover:text-indigo-400 leading-4">
                Seba Aguzzi
              </p>
              <span className="text-xs text-slate-400">Ocean Allies</span>
            </div>
          </a>
          <hr className="my-2 border-slate-700" />
          <Slidebar />
          <p className="text-sm text-center text-gray-600">
            v1.0.0.0 | &copy; 2023 Ocean Allies
          </p>
        </div>
        <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
          <Statistics />
          <Incomes />
          <Users />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);