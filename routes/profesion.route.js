const express = require('express');
const router = express.Router();

const profesion = require('../models/profesion');

router.get('/consultarProfesion', async (req, res) => {
    const result = await profesion.consultar();
    res.json(result);
});

module.exports = router;



