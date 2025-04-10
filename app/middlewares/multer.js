const multer = require('multer');

const storage = multer.diskStorage({
    // ini mau simpen dimana, ini mau disimpan di folder public > uploads
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    // depannya dirandom, misal nama file "foto.png", nanti saat upload ke db jadi "408224-foto.png"
    filename: function (req, file, cb) {
        cb(null, Math.floor(Math.random() * 99999999) + '-' + file.originalname);
    },
});


const fileFilter = (req, file, cb) => {
    // mimetype buat filter apa aja jenis file yang boleh masuk
    if (file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true); // kalau true, ga ngapa2in, berhasil2 aja
    } else {
        // reject file
        cb({
            message: 'Unsupported file format',
        },
            false
        );
    }
};

const uploadMiddleware = multer({
    storage,
    limits: {
        fileSize: 3000000,
    },
    fileFilter: fileFilter,
});

module.exports = uploadMiddleware;
