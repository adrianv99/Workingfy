const express = require('express');
const router = express.Router();

const Pais = require('../models/pais');
const Estado = require('../models/estado');

router.get('/consultarPais', async (req, res) => {
    const paises = await Pais.consultar();
    res.json(paises);
});

router.get('/consultarEstadoPorPais', async (req, res) => {
    const estado = await Estado.consultarPorPais(req.query.id_country);
    res.json(estado);
});

module.exports = router;