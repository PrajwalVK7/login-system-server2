const inputValidateMiddleware = require('../Middlewares/inputValidateMiddleware')


const userController = require('../Controller/userController')

const express = require('express');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');

const router = new express.Router();

// register 
router.post('/user/register',inputValidateMiddleware,userController.registerUser)

//login

router.post('/user/login',userController.loginUser)


// edit password

router.put('/user/password-edit',inputValidateMiddleware,jwtMiddleware,userController.editPassword)

module.exports = router;
