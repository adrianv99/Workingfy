const pool = require('../db_connection');
const encode = require('nodejs-base64-encode');
const TokenGenerator = require('uuid-token-generator');
const token = new TokenGenerator();

//Encrypt library

const loginCrtl = {};
loginCrtl.sesion = async (req, res) => {
    try{
        //realizamos una  consulta para ver si el correo y la contraseña son correctos,
        const correos = await pool.query("SELECT correo, contrasena FROM cliente WHERE correo='"+req.body.correo+"'");
        var match = false;
        correos.forEach( (qCliente) => {

            //Procede a desencriptar la contraseña y almacenarla nuevamente en el query
            qCliente.contrasena = 	encode.decode(""+qCliente.contrasena+"", 'base64')
            
            if(qCliente.correo === req.body.correo && qCliente.contrasena === req.body.contrasena){
                match = true;
            }
        });

        //si la contraseña coincidio
        if(match === true){
            console.log('Se ha iniciado sesion correctamente') //preliminar
            res.status(200).json({ message: 'success', token: token.generate()});
        }else{
            console.log('Correo o contraseña incorrectos') //preliminar
            res.status(400).json({ message: 'failed'});
        }
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Error en los servicios'});
    }
};



module.exports = loginCrtl;