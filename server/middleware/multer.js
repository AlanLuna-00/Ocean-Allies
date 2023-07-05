const multer = require('multer');

// Configurar el almacenamiento de los archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../Images'); // Ruta absoluta de la carpeta de destino para las imágenes subidas
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Utiliza el nombre original del archivo
    },
});

// Crear el middleware de Multer
const upload = multer({ storage });

module.exports = upload;
