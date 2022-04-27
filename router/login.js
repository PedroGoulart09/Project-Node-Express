const express = require('express');

const router = express.Router();
const { generateRandomToken,
} = require('../middlewares/talkerMiddlewares');
const { isValidEmail, isValidPassword } = require('../Controllers/loginValidation');

router.post('/login', isValidEmail, isValidPassword, generateRandomToken);

module.exports = router;