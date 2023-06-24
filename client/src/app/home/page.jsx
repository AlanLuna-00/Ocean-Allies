"use client"
import FotoHome from "@/components/FotoHome";
import Testimonials from "@/components/Testimonials";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="container mx-auto p-10 md:max-w-full">
      {/*  */}
      <div className="">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          class="text-center max-w-xl mx-auto">
          <h1 class="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
            The ocean is also <br />
            our land.
          </h1>
          <div class="text-center mb-10">
            <span class="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
            <span class="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
            <span class="inline-block w-40 h-1 rounded-full bg-blue-600 ml-1"></span>
            <span class="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
            <span class="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-10 md:max-w-full">
          {/* px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="col-span-1 relative ">
            {/* Contenido de la primera columna */}
            <h1 className="text-4xl md:text-2xl font-bold mb-10 text-gray-100 mt-0 text-center uppercase absolute top-20 z-10 sm:text-lg">
              NGO dedicated to the protection and conservation of the marine
              world.
            </h1>
            <div
              className="h-64 bg-cover bg-center flex flex-col items-center justify-center hover:blur-sm transition-all duration-500 ease-in-out rounded-md shadow-2xl "
              style={{ backgroundImage: "url(/img/delfin.jpg) " }}
            ></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="col-span-1 relative">
            {/* Contenido de la segunda columna */}
            <h1 className="text-4xl md:text-2xl font-bold mb-10 text-gray-100 mt-0 text-center uppercase absolute top-20 z-10">
              We specialize in research and monitoring of marine species.
            </h1>
            <div
              className="h-64 bg-cover bg-center flex flex-col items-center justify-center hover:blur-sm transition-all duration-500 ease-in-out  rounded-md shadow-2xl"
              style={{ backgroundImage: "url(/img/foca.jpg)" }}
            ></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="col-span-1 relative">
            {/* Contenido de la tercera columna */}
            <h1 className="text-4xl md:text-2xl font-bold mb-10 text-gray-100 mt-0 text-center uppercase absolute top-20 z-10">
              Awareness campaigns and educational programs.
            </h1>
            <div
              className="h-64 bg-cover bg-center flex flex-col items-center justify-center hover:blur-sm transition-all duration-500 ease-in-out  rounded-md shadow-2xl"
              style={{ backgroundImage: "url(/img/corales.jpg)" }}
            ></div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="md:max-w-full py-12 rounded-md bg-cover h-64 mt-10">
          <FotoHome />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        class="text-center max-w-xl mx-auto p-20 mt-10  ">
        <div class="text-center mb-10">
          <span class="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
          <span class="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
          <span class="inline-block w-40 h-1 rounded-full bg-blue-600 ml-1"></span>
          <span class="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
          <span class="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
        </div>
        <h1 class="text-6xl md:text-6xl font-bold mb-5 text-gray-600 ">
          IT’S TIME TO TAKE ACTION!
        </h1>
        <h3 class="text-6xl md:text-3xl font-bold mb-5 text-gray-600">
          We are all part of the problem and the solution. Get involved and help
          us keep the ocean clean.
        </h3>
        <div class="text-center mb-10">
          <span class="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
          <span class="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
          <span class="inline-block w-40 h-1 rounded-full bg-blue-600 ml-1"></span>
          <span class="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
          <span class="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
        </div>
      </motion.div>
      {/*  */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className=" grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-20 md:max-w-full ">
        <div className="col-span-1">
          {/* Contenido de la tercera columna */}
          <div
            className="h-64 bg-cover bg-center flex flex-col items-center justify-center"
            style={{ backgroundImage: "url(/img/shop.jpg)" }}
          >
            <h1 className="text-4xl md:text-3xl font-bold mb-10 text-gray-100 mt-0 text-center uppercase">
              SHOP
            </h1>
          </div>
        </div>
        <div className="col-span-1">
          {/* Contenido de la tercera columna */}
          <div
            className="h-64 bg-cover bg-center flex flex-col items-center justify-center"
            style={{ backgroundImage: "url(/img/manos.jpg)" }}
          >
            <h1 className="text-4xl md:text-3xl font-bold mb-10 text-gray-100 mt-0 text-center uppercase">
              DONATIONS
            </h1>
          </div>
        </div>
      </motion.div>
      <Testimonials />
    </div>
  );
}
