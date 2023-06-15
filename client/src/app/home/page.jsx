import FotoHome from "@/components/FotoHome";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="container mx-auto p-8 md:max-w-full">
      {/*  */}
      <div className="h-screen">
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
      {/*  */}
      <div className=" grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-20 md:max-w-full p-8 m-20">
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
