import Image from "next/image";

export default function Home() {
  return (
    <div className="w-9/12 m-auto">
      <div className="flex">
        <div className="w-1/2 p-8">
          <Image src="/img/delfin.jpg" width={1000} height={1000} />
        </div>
        <div className="w-1/2 mx-auto p-8">
          <h1 className="text-2xl text-left mt-24 block">
            Somos una ONG dedicada a la protección y conservación del mundo
            marino. Trabajamos incansablemente para preservar la vida marina y
            los ecosistemas costeros, promoviendo la sostenibilidad y educando
            sobre la importancia de nuestros océanos.
          </h1>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 p-5">
          <h1 className="text-2xl text-left mt-24 block">
            Nuestra ONG se dedica a la investigación y monitoreo de especies
            marinas, colaborando con científicos y expertos para impulsar la
            conservación de tortugas marinas, cetáceos y arrecifes coralinos.
            Además, implementamos programas de limpieza de playas y promovemos
            el turismo responsable.
          </h1>
        </div>
        <div className="w-1/2">
          <Image src="/img/foca.jpg" width={1000} height={1000} />
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 p-8">
          <Image src="/img/medusa.jpg" width={1000} height={1000} />
        </div>
        <div className="w-1/2 mx-auto p-8">
          <h1 className="text-2xl text-left mt-24 block">
            A través de campañas de concienciación y programas educativos
            nuestra ONG busca inspirar a las comunidades locales y globales a
            tomar acción por el mundo marino. Trabajamos en colaboración con
            gobiernos organizaciones internacionales y voluntarios comprometidos
            para lograr un futuro sostenible para nuestros océanos.
          </h1>
        </div>
      </div>
    </div>
  );
}
