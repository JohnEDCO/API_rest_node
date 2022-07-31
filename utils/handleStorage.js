const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb es callback function( funcion que se ejecuta)
        const pathStorage = `${__dirname}/../storage`;
        //cb recibe un error como primer argumento y como segundo un string que es el destino donde se guardara el archivo
        cb(null, pathStorage)
    },
    filename: function (req, file, cb) {
        //TODO: mi-cv.pdf, mi-foto.png, mi-video.mp3, ... etc
        //conla funcion pop nos aseguramos siempre de obtener el ultimo elemento del arrya que nos deja split()
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null, filename)
    }
})
//forma corta y bonita
const uploadMiddleware = multer({ storage });
//  forma fea, aqui cuando se repite el mismo nombre podemos aplicar destructuring
//  const uploadMiddleware = multer({
//      storage: storage
//     });

module.exports = uploadMiddleware;