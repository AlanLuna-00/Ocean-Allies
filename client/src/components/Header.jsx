import Link from "next/link";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className="h-screen">
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        style={{
          backgroundPosition: "50%",
          backgroundImage: "url(/img/fondomar.jpg)",
          height: "100vh",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex-shrink-0 flex justify-center"
              >
                <img src="/img/ocean.svg" alt="Logo" className="w-8 h-8 mr-2" />
                <h1 className="mb-8 bg-gradient-to-tr from-cyan-100 to-blue-600 bg-clip-text text-transparent text-3xl font-bold">
                  Ocean Allies
                </h1>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 0.8 }}
                className="mb-8 text-3xl font-bold"
              >
                Where life and the aquatic world come together.
              </motion.h3>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 0.8 }}
              >
                <Link
                  href="/home"
                  className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                >
                  Home
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
