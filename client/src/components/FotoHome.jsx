import React from 'react'

function FotoHome() {
    return (
        <div className="col-span-1 ">
            {/* Contenido de la primera columna */}
            <div
                className="h-64 bg-cover bg-center"
                style={{ backgroundImage: "url(/img/fotoceano.jpg)" }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-100">
                    Intentamos salvar a los oceanos pero solos no podemos!
                </h1>
            </div>
        </div>
    )
}

export default FotoHome