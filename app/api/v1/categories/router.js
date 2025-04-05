const express = require('express')
const router = express();
const { create, index, find, update } = require('../categories/controller')

// url nya ke /categories, manggil func index dr controller
router.get('/categories', index);

router.get('/categories/:id', find);

// update
router.put('/categories/:id', update);

// url nya ke /categories, manggil func create dr controller
router.post('/categories', create);

module.exports = router;