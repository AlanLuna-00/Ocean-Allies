"use client"
import React, { useEffect, useState } from 'react'


const Profile = () => {

  const [id, setId] = useState(null);
  const [buy, setBuy] = useState([]);
  
  //Accedo a la informacion del usuario
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setId(JSON.parse(localStorage.getItem("user")).id);
    }
    compras();
  }, []);

  // const compras = [
  //   {
  //     fecha: '10/06/2023',
  //     producto: 'Camiseta Nike',
  //     precio: '$50.00',
  //   },
  //   {
  //     fecha: '05/06/2023',
  //     producto: 'Zapatos Adidas',
  //     precio: '$80.00',
  //   },
  //   {
  //     fecha: '01/06/2023',
  //     producto: 'Pantalones Levi\'s',
  //     precio: '$60.00',
  //   },
  // ];

   const compras = async () => {
    const res = await axios.get(`http://localhost:8080/api/users/${id}`)
    const compra = res.data.purchase;
    setBuy(compra);    
    console.log(buy)
  }

  // La img de perfil tiene que ser subida con cloudinary.
  // El historial de compra debe mostrar que productos ha comprado el usuario.
  // Pop-UP para cambiar contraseña (modal).

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <div className="md:sticky md:top-8 bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center">
                <label htmlFor="">Aca iria la imagen de perfil</label>
              </div>
              <div className="text-center mt-4">
                <h2 className="text-2xl font-bold text-gray-800">Nombre de usuario</h2>
                <p className="text-sm font-medium text-gray-500">Ocupación</p>
                <p className="text-sm font-medium text-gray-500">Ubicación</p>
              </div>
              <hr className="my-4" />
              <div className="text-center">
                <a href="#" className="text-indigo-600 hover:underline"> 
                  Cambiar contraseña
                </a>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Historial de compra</h3>
              {/* {buy.map((compra, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-300">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{compra.fecha}</p>
                    <p className="text-lg font-bold text-gray-800">{compra.producto}</p>
                  </div>
                  <p className="text-lg font-bold text-gray-800">{compra.precio}</p>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;