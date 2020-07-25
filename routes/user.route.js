const express = require('express');
const router = express.Router();

const Cliente = require('../models/cliente');
const Freelancer = require('../models/freelancer');
const verificarToken = require('../controllers/auth.controller');


router.post('/insertarCliente', async (req, res) => {
    const result = await Cliente.insertar(req.body);
    res.json({ message: result });
});

router.post('/insertarFreelancer', async (req, res) => {
    const result = await Freelancer.insertar(req.body);
    res.json({ message: result });
});

router.get('/consultarPorId', verificarToken, async (req, res) => {

    if(req.roll === 'Cliente'){
        const cliente = await Cliente.consultarPorId(req.userId);
        res.json(cliente);
    }
    else if(req.roll === 'Freelancer'){
        const freelancer = await Freelancer.consultarPorId(req.userId);
        res.json(freelancer);
    }

});

module.exports = router;