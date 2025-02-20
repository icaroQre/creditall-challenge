const multer = require('multer');
const path = require('path');

// Define o local onde as imagens serão salvas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName); // Define o nome do arquivo (timestamp + extensão)
  }
});

// Filtra os arquivos permitidos (apenas imagens)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Somente imagens são permitidas!'), false);
  }
};

// Configura o upload com o multer
const uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limita o tamanho do arquivo para 5MB
});

module.exports = uploadImage;
