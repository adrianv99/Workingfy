const pool = require('../db_connection');
const encode = require('nodejs-base64-encode');
const jwt = require('jsonwebtoken');

const loginCrtl = {};

loginCrtl.signin = async (req, res) => {
    try{

        var match = false;
        var roll = '';
        var userId = null;

        //realizamos una  consulta para ver si el correo y la contraseña son correctos en la tabla cliente,
        var datosCliente = await pool.query("SELECT id, correo, contrasena FROM cliente WHERE correo='"+req.body.correo+"' AND estado='A' ");
        
        if(Object.entries(datosCliente).length === 1){
            //Procede a desencriptar la contraseña y compararla con la que envio el usuario
            datosCliente[0].contrasena = encode.decode(""+datosCliente[0].contrasena+"", 'base64')
            if(datosCliente[0].correo === req.body.correo && datosCliente[0].contrasena === req.body.contrasena){
                userId = datosCliente[0].id;
                match = true;
                roll = 'Cliente';
            }
        }
        
        //realizamos una  consulta para ver si el correo y la contraseña son correctos en la tabla freelancer,
        var datosFreelancer = await pool.query("SELECT id, correo, contrasena FROM freelancer WHERE correo='"+req.body.correo+"' AND estado='A'");
     
        if(Object.entries(datosFreelancer).length === 1){
            //Procede a desencriptar la contraseña y compararla con la que envio el usuario
            datosFreelancer[0].contrasena = encode.decode(""+datosFreelancer[0].contrasena+"", 'base64');
            if(datosFreelancer[0].correo === req.body.correo && datosFreelancer[0].contrasena === req.body.contrasena){
                userId = datosFreelancer[0].id;
                match = true;
                roll = 'Freelancer';
            }
        }


        //si la contrasena coincidio
        if(match === true){

            //generar token en base al id y una clave del sistema (oK15w9nX)
            const token = jwt.sign({ id: userId, roll }, 'oK15w9nX', {
                expiresIn: 60 * 60 * 24 // expira en 24h
            });

            res.status(200).json({ message: 'success', token });
        }else{
            console.log('Correo o contraseña incorrectos'); // preliminar
            res.status(200).json({ message: 'Correo o contraseña incorrectos'});
        }
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Error en los servicios'});
    }
};



module.exports = loginCrtl;