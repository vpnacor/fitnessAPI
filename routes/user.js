const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const {verify} = require('../auth');



router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
router.get('/details', verify, userController.userDetails)







module.exports = router;