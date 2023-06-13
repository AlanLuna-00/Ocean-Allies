import Image from "next/image"

export default function About() {
  return (
    <div className="bg-gray-100 p-8">
      <h1 className="text-center text-black">About</h1>
      <div>
        <h2 className="text-center text-black">Equipo de desarrolladores</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Image src="/img/Alan.jpeg" alt="Alan" width={300} height={300} />
            <p className="text-center text-black">Alan</p>
          </div>
          <div>
            <Image src="/img/Fran.jpg" alt="Fran" width={300} height={300} />
            <p className="text-center text-black">Fran</p>
          </div>
          <div>
            <Image src="/img/Kevin.jpg" alt="Kevin" width={300} height={300} />
            <p className="text-center text-black">Kevin</p>
          </div>
          <div>
            <Image src="/img/Manu.jpg" alt="Manu" width={300} height={300} />
            <p className="text-center text-black">Manu</p>
          </div>
          <div>
            <Image src="/img/Mauri.jpg" alt="Mauri" width={300} height={300} />
            <p className="text-center text-black">Mauri</p>
          </div>
          <div>
            <Image src="/img/Pablo.jpg" alt="Pablo" width={300} height={300} />
            <p className="text-center text-black">Pablo</p>
          </div>
          <div>
            <Image src="/img/Seba.jpg" alt="Seba" width={300} height={300} />
            <p className="text-center text-black">Seba</p>
          </div>
        </div>
      </div>
    </div>
  )
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
