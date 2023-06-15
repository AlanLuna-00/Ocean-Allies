import React from 'react'

function FotoHome() {
    return (
        <div className="col-span-1 ">
            {/* Contenido de la primera columna */}
            <div
                className="h-64 bg-cover bg-center flex flex-col items-center justify-center "
                container flex flex-col items-center justify-center h-full
                style={{ backgroundImage: "url(/img/fotoceano.jpg)" }}
            >
                <h1 className="text-4xl md:text-4xl font-bold mb-10 text-gray-100 mt-0 text-center uppercase ">
                    We need your help!
                </h1>
            </div>
        </div>
    )
}

export default FotoHome