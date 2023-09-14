const express = require('express');
const router = express.Router()
const {registerUser,loginUser,userFetched} = require('../controllers/userController')
const {protect} = require('../middleWare/authMiddleware');


router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,userFetched)

module.exports =router;