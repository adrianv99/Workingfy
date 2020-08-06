const express = require('express');
const router = express.Router();

//models
const Cliente = require('../models/cliente');
const Freelancer = require('../models/freelancer');
const Profesion = require('../models/profesion');
const Proyecto = require('../models/proyecto');

//controllers
const verificarToken = require('../controllers/auth.controller');
const enviarCorreo = require('../controllers/enviarCorreo.controller');


router.post('/insertarCliente', async (req, res) => {
    const result = await Cliente.insertar(req.body);

    const correoResult = await enviarCorreo({
        destinatario: req.body.correo,
        asunto: 'Bienvenido a Workingfy',
        cuerpo: 'Te haz registrado en workingfy de forma correcta'
    });
    console.log(correoResult);

    res.json({ message: result });
});

router.post('/insertarFreelancer', async (req, res) => {
    const result = await Freelancer.insertar(req.body);

    const correoResult = await enviarCorreo({
        destinatario: req.body.correo,
        asunto: 'Bienvenido a Workingfy',
        cuerpo: 'Te haz registrado en workingfy de forma correcta'
    });
    console.log(correoResult);
    
    res.json({ message: result });
});

router.get('/consultarPorId', verificarToken, async (req, res) => {

    if(req.roll === 'Cliente'){
        const cliente = await Cliente.consultarPorId(req.userId);
        const rating = await Cliente.consultarRating(req.userId);
        const proyectosTerminados = await Proyecto.consultarProyectosFinalizados(req.roll, req.userId);
        
        cliente[0].rating = rating;
        cliente[0].proyectosTerminados = proyectosTerminados;
        res.json(cliente);
    }
    else if(req.roll === 'Freelancer'){
        const freelancer = await Freelancer.consultarPorId(req.userId);
        const rating = await Freelancer.consultarRating(req.userId);
        const proyectosTerminados = await Proyecto.consultarProyectosFinalizados(req.roll, req.userId);

        freelancer[0].proyectosTerminados = proyectosTerminados;
        freelancer[0].rating = rating;
        res.json(freelancer);
    }
});

router.post('/editarUsuario', verificarToken, async (req, res) => {
    if(req.roll === 'Cliente'){
        //verificamos si el usuario quiere modificar su correo
        //debido a que cada usuario debe tener un correo unico
        let correoNuevo = false;
        const cliente = await Cliente.consultarPorId(req.userId);
        if(cliente[0].correo !== req.body.correo){
            correoNuevo = true;
        }

        const result = await Cliente.editar(req.body, correoNuevo);
        res.json({ message: result});

    }
    else if(req.roll === 'Freelancer'){
        //verificamos si el usuario quiere modificar su correo
        //debido a que cada usuario debe tener un correo unico
        let correoNuevo = false;
        const freelancer = await Freelancer.consultarPorId(req.userId);
        if(freelancer[0].correo !== req.body.correo){
            correoNuevo = true;
        }
        
        const result = await Freelancer.editar(req.body, correoNuevo);
        res.json({ message: result});

    }
    
});

router.post('/filtrarFreelancers', verificarToken, async (req, res) => {
    //explorar cliente
    if(req.body.filterBy === ''){
        var freelancers = await Freelancer.consultar();

        //agregando el rating a cada freelancer
        for( x = 0; x < freelancers.length; x++){
            freelancers[x].rating = await Freelancer.consultarRating(freelancers[x].id);
            freelancers[x].proyectosTerminados = await Proyecto.consultarProyectosFinalizados('Freelancer', freelancers[x].id);
        }

        res.json(freelancers);
    }
    else if(req.body.filterBy === 'profesion'){
        const freelancers = await Freelancer.consultarPorProfesion(req.body.id_profesion);

        //agregando el rating a cada freelancer
        for( x = 0; x < freelancers.length; x++){
            freelancers[x].rating = await Freelancer.consultarRating(freelancers[x].id);
            freelancers[x].proyectosTerminados = await Proyecto.consultarProyectosFinalizados('Freelancer', freelancers[x].id);
        }
       
        res.json(freelancers);
    }
});

router.post('/consultarFreelancerProfile', verificarToken, async (req, res) => {
    const freelancer = await Freelancer.consultarPorId(req.body.id);
    const rating = await Freelancer.consultarRating(req.body.id);
    const profesion = await Profesion.consultarPorId(freelancer[0].id_profesion);
    const proyectosTerminados = await Proyecto.consultarProyectosFinalizados('Freelancer', req.body.id);
    
    // añadiendo la propiedades al perfil 
    freelancer[0].rating = rating;
    freelancer[0].profesion = profesion[0].nombre;
    freelancer[0].proyectosTerminados = proyectosTerminados;

    //eliminando propiedades innecesariass para esta peticion
    delete freelancer[0].contrasena;
    delete freelancer[0].cedula;
    delete freelancer[0].id_profesion;

    // OJO falta agregar la cantidad de trabajos publicados y completados
    // tambien el listado de los trabajos que ha realizado el freelancer 
    res.json(freelancer);
});

router.post('/consultarClienteProfile', verificarToken, async (req, res) => {
    const cliente = await Cliente.consultarPorId(req.body.id);
    const rating = await Cliente.consultarRating(req.body.id);
    const proyectosTerminados = await Proyecto.consultarProyectosFinalizados('Cliente', req.body.id);

    // añadiendo la propiedades al perfil 
    cliente[0].rating = rating;
    cliente[0].proyectosTerminados = proyectosTerminados;

    //eliminando propiedades innecesariass para esta peticion
    delete cliente[0].contrasena;
    delete cliente[0].cedula;

    // OJO falta agregar la cantidad de trabajos publicados y completados
    res.json(cliente);
});

module.exports = router;