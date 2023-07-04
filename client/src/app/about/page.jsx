"use client";
import Image from "next/image";
import { useState } from "react";

export default function About() {
  const developers = [
    {
      name: "Alan",
      image: "/img/Alan.jpeg",
      text: "Full Stack",
      linkedIn: "https://www.linkedin.com/in/alan-luna-304655214/",
      gitHub: "https://github.com/AlanLuna-00",
    },
    {
      name: "Seba",
      image: "/img/Seba.jpg",
      text: "Full Stack Developer",
      linkedIn: "https://www.linkedin.com/in/sebastian-aguzzi-757341277/",
      gitHub: "https://github.com/SebAguzzi",
    },
    {
      name: "Kevin",
      image: "/img/Kevin.png",
      text: "Frontend Developer",
      linkedIn: "https://www.linkedin.com/in/kevin-barrios-developer/",
      gitHub: "https://github.com/MotionSoft05",
    },
    {
      name: "Manu",
      image: "/img/Manu.png",
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
      name: "Fran",
      image: "/img/Fran.jpg",
      text: "Backend Developer",
      linkedIn: "https://www.linkedin.com/in/francisco-puy-02406b269",
      gitHub: "https://github.com/franciscopuy",
    },
  ];

  const [isHovered, setIsHovered] = useState(false); //! Pendiente para usar en imagenes hover

  return (
    <div
      className="bg-gray-100 py-12 px-6 bg-cover "
      style={{
        backgroundImage: "url(/img/gafas-mesa-sala-reuniones-negocios.jpg)",
      }}
    >
      <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600 text-center">
        About
      </h1>

      <div className="max-w-4xl mx-auto flex flex-col">
        <p className="bg-opacity-60 shadow-xl  text-2xl font-medium mb-6 text-center text-black grid  gap-8 rounded-lg bg-white p-6">
          Ocean Allies is a plataform devoted to the conservation and protection
          of marine animals. Our mission is to save the life in the oceans and
          preserve the marine environment for generations to come. we are
          compromise in creating curiosity about the challenges that the marine
          animals face and promote actions to mitigate the dangers that they
          face in their environment.
        </p>
        <div className="px-4  mx-auto  ">
          <p className="border-t-0 inline-block px-3 py-px mb-4 text-lg font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Devs Team
          </p>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {developers.map((developer) => (
              <div>
                <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                  <Image
                    src={developer.image}
                    alt={developer.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-56 md:h-64 xl:h-80"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />
                  <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                    <p className="mb-1 text-lg font-bold text-gray-100">
                      {developer.name}
                    </p>
                    <p className="mb-4 text-xs text-gray-100">
                      {developer.text}
                    </p>
                    <div className="flex items-center justify-center space-x-3">
                      {/* <ul className="mx-auto flex justify-center space-x-2"> */}
                      <a
                        href={developer.gitHub}
                        target="_blank"
                        className="text-white transition-colors duration-300 hover:text-teal-accent-400"
                      >
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
                      <a
                        href={developer.linkedIn}
                        target="_blank"
                        className="px-2"
                      >
                        <img
                          className="w-7 text-primary dark:text-primary-400 transition-all duration-300  hover:scale-125 "
                          src="/img/Linkedin.svg"
                          alt=""
                        />
                      </a>
                      {/* </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
