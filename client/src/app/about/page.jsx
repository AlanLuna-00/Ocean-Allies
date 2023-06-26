"use client";
import Image from "next/image";
import { useState } from "react";

export default function About() {
  const developers = [
    {
      name: "Alan",
      image: "/img/Alan.jpeg",
      text: "Full Stack",
      linkedIn: "",
      gitHub: "https://github.com/AlanLuna-00",
    },
    {
      name: "Fran",
      image: "/img/Fran.jpg",
      text: "Backend Developer",
      linkedIn: "https://www.linkedin.com/in/francisco-puy-02406b269",
      gitHub: "https://github.com/franciscopuy",
    },
    {
      name: "Kevin",
      image: "/img/Kevin.jpg",
      text: "Frontend Developer",
      linkedIn: "https://www.linkedin.com/in/kevin-barrios-developer/",
      gitHub: "https://github.com/MotionSoft05",
    },
    {
      name: "Manu",
      image: "/img/Manu.jpg",
      text: "Backend Developer",
      linkedIn: "https://www.linkedin.com/in/emanuel-alessi-developer",
      gitHub: "https://github.com/manuga23000",
    },
    {
      name: "Mauri",
      image: "/img/Mauri.jpg",
      text: "Frontend Developer",
      linkedIn: "",
      gitHub: "https://github.com/jmauriciom",
    },
    {
      name: "Pablo",
      image: "/img/Pablo.jpg",
      text: "Frontend Developer",
      linkedIn: "",
      gitHub: "https://github.com/pablopissoni",
    },
    {
      name: "Seba",
      image: "/img/Seba.jpg",
      text: "Full Stack Developer",
      linkedIn: "https://www.linkedin.com/in/sebastian-aguzzi-757341277/",
      gitHub: "https://github.com/SebAguzzi",
    },
  ];

  const [isHovered, setIsHovered] = useState(false); //! Pendiente para usar en imagenes hover

  return (
    <div className="bg-gray-100 py-12 px-6 bg-cover " style={{ backgroundImage: "url(/img/gafas-mesa-sala-reuniones-negocios.jpg)" }}>
      <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600 text-center">About</h1>

      <div className="max-w-4xl mx-auto flex flex-col">
        <p className="bg-opacity-60 shadow-xl  text-2xl font-medium mb-6 text-center text-black grid  gap-8 rounded-lg bg-white p-6">
          Ocean Allies es una plataforma dedicada a la conservación y protección
          de los animales marinos. Nuestra misión es salvaguardar la vida en los
          océanos y preservar los hábitats marinos para las generaciones
          futuras. Estamos comprometidos en crear conciencia sobre los desafíos
          que enfrentan los animales marinos y promover acciones para mitigar
          las amenazas que enfrentan en su entorno.
        </p>
        <h2 className="bg-white rounded-lg bg-opacity-60 text-2xl font-bold mb-6 text-center text-black">
          Equipo de desarrolladores
        </h2>
        <div className="grid grid-cols-4 gap-8  rounded-lg bg-gray-100 p-6 bg-opacity-60 shadow-xl">
          {developers.map((developer) => (
            <div
              key={developer.name}
              className="flex flex-col items-center pb-2"
            >
              <div className="relative w-40 h-40 rounded-t-2xl overflow-hidden">
                <Image
                  src={developer.image}
                  alt={developer.name}
                  width={300}
                  height={300}
                  sizes="(max-width: 640px) 100px, (max-width: 768px) 200px, 500px"
                  // layout="fill"
                  // objectFit="cover"
                  className="transition-all duration-300 ease-in-out hover:scale-105"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              </div>

              <div className="bg-neutral-100  shadow-xl relative w-40 pb-2 rounded-b-2xl">
                <h5 className="text-xl font-semibold mt-4 text-gray text-center">
                  {developer.name}
                </h5>
                <p className="text-neutral-500 dark:text-neutral-600 text-center">
                  {developer.text}
                </p>

                <ul className="mx-auto flex list-inside justify-center">
                  {/*<!-- GitHub -->*/}
                  <a href={developer.gitHub} target="_blank" className="px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-primary dark:text-primary-400 transition-all duration-300  hover:scale-125"
                    >
                      <path
                        fill="currentColor"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </a>

                  {/*<!-- LinkedIn -->*/}
                  <a href={developer.linkedIn} target="_blank" className="px-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-primary dark:text-primary-400 transition-all duration-300  hover:scale-125"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20.45175,20.45025 L16.89225,20.45025 L16.89225,14.88075 C16.89225,13.5525 16.86975,11.844 15.04275,11.844 C13.191,11.844 12.90825,13.2915 12.90825,14.7855 L12.90825,20.45025 L9.3525,20.45025 L9.3525,8.997 L12.765,8.997 L12.765,10.563 L12.81375,10.563 C13.2885,9.66225 14.4495,8.71275 16.18125,8.71275 C19.78575,8.71275 20.45175,11.08425 20.45175,14.169 L20.45175,20.45025 Z M5.33925,7.4325 C4.1955,7.4325 3.27375,6.50775 3.27375,5.36775 C3.27375,4.2285 4.1955,3.30375 5.33925,3.30375 C6.47775,3.30375 7.4025,4.2285 7.4025,5.36775 C7.4025,6.50775 6.47775,7.4325 5.33925,7.4325 L5.33925,7.4325 Z M7.11975,20.45025 L3.5565,20.45025 L3.5565,8.997 L7.11975,8.997 L7.11975,20.45025 Z M23.00025,0 L1.0005,0 C0.44775,0 0,0.44775 0,0.99975 L0,22.9995 C0,23.55225 0.44775,24 1.0005,24 L23.00025,24 C23.55225,24 24,23.55225 24,22.9995 L24,0.99975 C24,0.44775 23.55225,0 23.00025,0 L23.00025,0 Z"
                      ></path>
                    </svg>
                  </a>
                  <a href="#!" className="px-2"></a>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// {isHovered && (
//   <div >
//      <svg
//      xmlns="http://www.w3.org/2000/svg"
//      fill="none"
//      viewBox="0 0 24 24"
//      stroke-width="1.5"
//      stroke="currentColor"
//      class="h-8 w-8">
//      <path
//        stroke-linecap="round"
//        stroke-linejoin="round"
//        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
//    </svg>

//   </div>
// )}
