import Link from "next/link";

function Slidebar({ setShowUsers, setShowProducts, setShowTestimonys }) {
  return (
    <div id="menu" className="flex flex-col space-y-2 my-5">


      <button
        href="#"
        className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
        onClick={() => {
          setShowProducts(false);
          setShowUsers(false);
          setShowTestimonys(true);
        }}
      >
        <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 group-hover:text-indigo-400"
            >
              <path
                stroke-linecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>

          <div>
            <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
              Testimony
            </p>
            <p className="text-slate-400 text-sm hidden md:block">
              Manage Testimony
            </p>
          </div>

        </div>
      </button>

      <button
        // href="/dashboard/users"
        className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
        onClick={() => {
          setShowProducts(false);
          setShowUsers(true);
          setShowTestimonys(false);
        }}
      >
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 group-hover:text-indigo-400"
            >
              <path
                stroke-linecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
              Users
            </p>
            <p className="text-slate-400 text-sm hidden md:block">
              Manage users
            </p>
          </div>
        </div>
      </button>

      <button
        // href="/dashboard/products"
        className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
        onClick={() => {
          setShowProducts(true);
          setShowUsers(false);
          setShowTestimonys(false);
        }}
      >
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 20a1 1 0 01-1-1V8a1 1 0 011-1h10a1 1 0 011 1v11a1 1 0 01-1 1H7zm6-18a2 2 0 00-2 2v1a2 2 0 002 2h3l-1 5h-4l1-5H7a2 2 0 00-2 2v1a2 2 0 002 2h3l-1 5-2 1-2-1-1-5h2l-1 5h6l-1-5h2l-1 5h2l-1-5h3a2 2 0 002-2V6a2 2 0 00-2-2h-4z"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
              Products
            </p>
            <p className="text-slate-400 text-sm hidden md:block">
              Products users
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

export default Slidebar;
