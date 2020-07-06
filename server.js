const express = require('express');
//Middleware para ver las peticiones al servidor en la consola
const morgan = require('morgan');

//inicializacion del servidor
const app = express();


//middleware
app.use(morgan('dev'));
app.use(express.json())


//routes
app.use('/api', require('./routes/profesion.route.js'));
app.use('/api', require('./routes/freelancer.route.js'));
app.use('/api', require('./routes/cliente.route.js'));
app.use('/api', require('./routes/login.route.js'));


//Inicio del servidor
app.listen(3000, ()=>{
    console.log('server on port', 3000);
});