const express = require('express');
const router = express.Router();

const Proyecto = require('../models/proyecto');

//controllers
const verificarToken = require('../controllers/auth.controller');


router.post('/insertarProyecto', verificarToken, async (req, res) => {
    
    let now = new Date();
    // agregando mas campos para ser insertados
    req.body.id_cliente = req.userId;
    req.body.seguimiento = 'iniciado';
    req.body.fecha = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    req.body.estado = 'A';

    const result = await Proyecto.insertar(req.body);
    res.json({ message: result});
});

module.exports = router;