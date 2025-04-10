const express = require('express')
const router = express();
const { create } = require('./controller')
const upload = require('../../../middlewares/multer')

// upload karena hanya satu maka pake single, nama 'avatar' bebas
router.post('/images', upload.single('avatar'), create);

module.exports = router;