import FotoHome from "@/components/FotoHome";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="container mx-auto p-8 md:max-w-full">
      {/*  */}
      <div className="h-screen">
        <div class="text-center max-w-xl mx-auto">
          <h1 class="text-6xl md:text-7xl font-bold mb-5 text-gray-600">The ocean is also  <br />our land.</h1>
          <div class="text-center mb-10">
            <span class="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
            <span class="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
            <span class="inline-block w-40 h-1 rounded-full bg-indigo-500 ml-1"></span>
            <span class="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
            <span class="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-10 md:max-w-full">

          {/* px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 */}
          <div className="col-span-1 ">
            {/* Contenido de la primera columna */}
            <div
              className="h-64 bg-cover bg-center flex flex-col items-center justify-center "
              style={{ backgroundImage: "url(/img/delfin.jpg) " }}
            >
              <h1 className="text-4xl md:text-2xl font-bold mb-10 text-gray-100 mt-0 text-center uppercase">
                NGO dedicated to the protection and conservation of the marine
                world.
              </h1>
            </div>
          </div>
          <div className="col-span-1">
            {/* Contenido de la segunda columna */}
            <div
              className="h-64 bg-cover bg-center flex flex-col items-center justify-center"
              style={{ backgroundImage: "url(/img/foca.jpg)" }}
            >
              <h1 className="text-4xl md:text-2xl font-bold mb-10 text-gray-100 mt-0 text-center uppercase">
                We specialize in research and monitoring of marine species.
              </h1>
            </div>
          </div>
          <div className="col-span-1">
            {/* Contenido de la tercera columna */}
            <div
              className="h-64 bg-cover bg-center flex flex-col items-center justify-center"
              style={{ backgroundImage: "url(/img/corales.jpg)" }}
            >
              <h1 className="text-4xl md:text-2xl font-bold mb-10 text-gray-100 mt-0 text-center uppercase">
                Awareness campaigns and educational programs.
              </h1>
            </div>
          </div>
        </div>
        <div className="md:max-w-full py-12 rounded-md bg-cover h-64">
          <FotoHome />
        </div>
      </div>
      <div class="text-center max-w-xl mx-auto">
        <h1 class="text-6xl md:text-6xl font-bold mb-5 text-gray-600">IT’S TIME TO TAKE ACTION!</h1>
        <h3 class="text-6xl md:text-3xl font-bold mb-5 text-gray-600">We are all part of the problem and the solution. Get involved and help us keep the ocean clean.</h3>
      </div>
      {/*  */}
      <div className=" grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-20 md:max-w-full p-8 m-20 ">
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
      </div>
      <Testimonials />
    </div>
  );
}
