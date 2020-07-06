const express = require('express');
const router = express.Router();
const { sesion } = require('../controllers/login.controller');

router.post('/login', sesion );

module.exports = router;