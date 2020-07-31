const express = require('express');
const router = express.Router();

const Interesado = require('../models/interesado');

//controllers
const verificarToken = require('../controllers/auth.controller');

router.post('/crearInteresado', verificarToken, async (req, res) => {
    let params = {
        id_freelancer: req.userId,
        id_proyecto: req.body.id_proyecto,
        estado :'A'
    }
    
    const result = await Interesado.insertar(params);
    res.json({ message: result});
});

router.get('/consultarInteresado', verificarToken, async (req, res) => {
    const interesados = await Interesado.consultar(req.query.id_proyecto);
    res.json(interesados);
});

module.exports = router;