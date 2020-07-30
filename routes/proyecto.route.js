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

router.get('/consultarProyecto', verificarToken, async (req, res) => {

    //consultar los proyectos relacionados con el cliente loggeado
    if(req.roll === 'Cliente') {
        const proyectos = await Proyecto.consultarProyectoCliente(req.userId);
        res.json(proyectos);
    }

    //consultar los proyectos relacionados con el freelancer loggeado
    if(req.roll === 'Freelancer') {
        const proyectos = await Proyecto.consultarProyectoFreelancer(req.userId);
        res.json(proyectos);
    }
    
});

router.post('/filtrarProyecto', verificarToken, async (req, res) => {
    
    //explorar freelancer
    if(req.body.filterBy === ''){
        const proyectos = await Proyecto.consultar();
        res.json(proyectos);
    }
    console.log(req.body.filterBy);

});

module.exports = router;