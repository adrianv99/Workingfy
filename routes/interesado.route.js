const express = require('express');
const router = express.Router();

//models
const Interesado = require('../models/interesado');
const Proyecto = require('../models/proyecto');
const Freelancer = require('../models/freelancer');

//controllers
const verificarToken = require('../controllers/auth.controller');
const enviarCorreo = require('../controllers/enviarCorreo.controller');

router.post('/crearInteresado', verificarToken, async (req, res) => {
    let params = {
        id_freelancer: req.userId,
        id_proyecto: req.body.id_proyecto,
        estado :'A'
    }

    const proyecto = await Proyecto.consultarPorId(req.body.id_proyecto);
    const freelancer = await Freelancer.consultarPorId(req.userId);
    //notificar al cliente que un freelancer esta interesado en uno de sus trabajos
    const correoResult = await enviarCorreo({
        destinatario: proyecto[0].correo_cliente,
        asunto: 'Tienes una solicitud de trabajo en un proyecto',
        cuerpo: `Usted ha recibido una solicitud por parte de ${freelancer[0].nombre} ${freelancer[0].apellido}, en el proyecto ${proyecto[0].asunto}`
    });
    console.log(correoResult);
    
    const result = await Interesado.insertar(params);
    res.json({ message: result});
});

router.get('/consultarInteresado', verificarToken, async (req, res) => {
    const interesados = await Interesado.consultar(req.query.id_proyecto);
    res.json(interesados);
});

router.post('/contratarInteresado', verificarToken, async (req, res) => {
    const result = await Interesado.contratar(req.body.id_proyecto, req.body.id_freelancer);

    const proyecto = await Proyecto.consultarPorId(req.body.id_proyecto);
    const freelancer = await Freelancer.consultarPorId(req.body.id_freelancer);
    //notificar al freelancer   que ha sido contratado en un proyecto
    const correoResult = await enviarCorreo({
        destinatario: freelancer[0].correo,
        asunto: 'Usted ha sido contratado para un proyecto',
        cuerpo: `${proyecto[0].nombre_cliente} ${proyecto[0].apellido_cliente} lo ha contratado en el proyecto ${proyecto[0].asunto}`
    });
    console.log(correoResult);


    res.json({ message: result});
});

module.exports = router;