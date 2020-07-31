const express = require('express');
const router = express.Router();

const Proyecto = require('../models/proyecto');

//controllers
const verificarToken = require('../controllers/auth.controller');

// ruta para creacion del proyecto
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

//ruta para consultar los proyctos del usuario loggeado
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

//ruta para consultar los poyectos que el freelancer buscara en Explorar page
router.post('/filtrarProyecto', verificarToken, async (req, res) => {
    
    //explorar freelancer
    if(req.body.filterBy === ''){
        const proyectos = await Proyecto.consultar(req.userId);
        res.json(proyectos);
    }
    else if(req.body.filterBy === 'profesion'){
        const proyectos = await Proyecto.consultarPorProfesion(req.body.id_profesion, req.userId);
        res.json(proyectos);
    }
    else if(req.body.filterBy === 'ubicacion'){
        const proyectos = await Proyecto.consultarPorUbicacion(req.body.id_ciudad, req.userId);
        res.json(proyectos);
    }
    else if(req.body.filterBy === 'fecha'){
        const proyectos = await Proyecto.consultarPorFecha(req.body.fechaInicio, req.body.fechaFin, req.userId);
        res.json(proyectos);
    }
    

});

module.exports = router;