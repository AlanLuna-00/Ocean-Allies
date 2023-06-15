import FotoHome from "@/components/FotoHome";
import Testimonials from "@/components/Testimonials";




export default function Home() {
  return (
    <div className="container m-auto p-4 flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-3 justify-between mb-4">
        <div className="col-span-1">
          {/* Contenido de la primera columna */}
          <div
            className="h-64 bg-cover bg-center"
            style={{ backgroundImage: "url(/img/delfin.jpg)" }}
          >
            <h1 className="text-white text-2xl p-4">
              ONG dedicada a la protección y conservación del mundo marino.
            </h1>
          </div>
        </div>
        <div className="col-span-1">
          {/* Contenido de la segunda columna */}
          <div
            className="h-64 bg-cover bg-center"
            style={{ backgroundImage: "url(/img/foca.jpg)" }}
          >
            <h1 className="text-white text-2xl p-4">
              Nuestra ONG se dedica a la investigación y monitoreo de especies marinas.
            </h1>
          </div>
        </div>
        <div className="col-span-1">
          {/* Contenido de la tercera columna */}
          <div
            className="h-64 bg-cover bg-center"
            style={{ backgroundImage: "url(/img/corales.jpg)" }}
          >
            <h1 className="text-white text-2xl p-4">
              Campañas de concienciación y programas educativos.
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full mb-4">
        <FotoHome />
      </div>
      <Testimonials />
    </div>
  );
};
































