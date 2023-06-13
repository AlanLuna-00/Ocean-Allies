import Image from 'next/image';

export default function About() {
  const developers = [
    { name: 'Alan', image: '/img/Alan.jpeg' },
    { name: 'Fran', image: '/img/Fran.jpg' },
    { name: 'Kevin', image: '/img/Kevin.jpg' },
    { name: 'Manu', image: '/img/Manu.jpg' },
    { name: 'Mauri', image: '/img/Mauri.jpg' },
    { name: 'Pablo', image: '/img/Pablo.jpg' },
    { name: 'Seba', image: '/img/Seba.jpg' },
  ];

  return (
    <div className="bg-gray-100 py-12 px-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">About</h1>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Equipo de desarrolladores</h2>
        <div className="grid grid-cols-2 gap-8">
          {developers.map((developer) => (
            <div key={developer.name} className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden">
                <Image
                  src={developer.image}
                  alt={developer.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <p className="text-lg font-semibold mt-4 text-black">{developer.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
//   return (
//     <div>
//       <h1>About</h1>
//       <div>
//         <h2>Equipo de desarrolladores</h2>
//         <div>
//           <img src='./img/Alan.jpeg' alt='Alan' ></img>
//           <p>Juan Carlos</p>

//           <img src='./img/Fran.jpg' alt='Fran' ></img>
//           <p>Juan Carlos</p>

//           <img src='./img/Kevin.jpg' alt='Kevin' ></img>
//           <p>Juan Carlos</p>

//           <img src='./img/Manu.jpg' alt='Manu' ></img>
//           <p>Juan Carlos</p>

//           <img src='./img/Mauri.jpg' alt='Mauri' ></img>
//           <p>Juan Carlos</p>

//           <img src='./img/Pablo.jpg' alt='Pablo' ></img>
//           <p>Juan Carlos</p>

//           <img src='./img/Seba.jpg' alt='Seba' ></img>
//           <p>Juan Carlos</p>
//         </div>
//       </div>
    
//     </div>
//   )
// }
