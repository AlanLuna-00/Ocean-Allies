"use client"
import React from 'react';

function FotoHome() {
    return (
        <div className="col-span-1">
            {/* Contenido de la primera columna */}
            <div
                className="h-64 bg-cover bg-center flex flex-col items-center justify-center"
                style={{ position: 'relative' }}
            >
                <video
                    className="w-full h-full object-cover"
                    src="/img/marvideo2.webm"
                    autoPlay
                    loop
                    muted
                ></video>
                <h1
                    className="text-4xl md:text-4xl font-bold mb-10 text-gray-100 mt-0 text-center uppercase"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                    }}
                >
                    We need your help!
                </h1>
            </div>
        </div>
    );
}

export default FotoHome;