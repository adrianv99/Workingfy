const express = require('express');
const router = express.Router();
const { signin } = require('../controllers/login.controller');

router.post('/login', signin );

module.exports = router;