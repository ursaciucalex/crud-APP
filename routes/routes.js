const express = require('express');
const controller = require('../controller/controller');

const router = express.Router();
router.get('/getAll', controller.user_get_all);
router.get('/:id', controller.user_get_byID);
router.post('/create', controller.user_create);
router.delete('/:id', controller.user_delete);
router.put('/:id',controller.update_user);
router.post('/login',controller.login_user);
module.exports = router;