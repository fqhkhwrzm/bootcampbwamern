const express = require('express')
const router = express();
const { create, index, find, update, destroy } = require('../categories/controller')
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');

// url nya ke /categories, manggil func index dr controller
// router.get('/categories', index);
// dengan middleware, categories hanya bisa diakses dengan role organizer:
router.get('/categories', authenticateUser, authorizeRoles('organizer'), index);

router.get('/categories/:id', authenticateUser,authorizeRoles('organizer'), find);

// update
router.put('/categories/:id', authenticateUser, authorizeRoles('organizer'), update);

// delete
router.delete('/categories/:id', authenticateUser, authorizeRoles('organizer'), destroy);

// url nya ke /categories, manggil func create dr controller
router.post('/categories', authenticateUser, authorizeRoles('organizer'), create);

module.exports = router;