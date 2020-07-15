const pool = require('../db_connection');
const encode = require('nodejs-base64-encode');

const clienteCrtl = {};

clienteCrtl.consultar = async (req, res) => {
    try{
        const cliente = await pool.query('SELECT * FROM cliente');
        console.log(cliente);
        res.status(200).json(cliente);
    }catch(error){
        console.log(error)
    }
};

clienteCrtl.insertar = async (req, res) => {
    try{
        //realizamos una  consulta para ver si el correo que envio el usuario esta en uso o no,
        //comprobando en la tabla freelancer
        var correos = await pool.query('SELECT correo FROM freelancer');
        var enUso = false;
        correos.forEach( (x) => {
            if(x.correo === req.body.correo){
                enUso = true;
            }
        });
        //comprobando en la tabla cliente
        correos = await pool.query('SELECT correo FROM cliente');
        correos.forEach( (x) => {
            if(x.correo === req.body.correo){
                enUso = true;
            }
        });

        //si el correo no esta en uso, se inserta, sino el servidor responde con un mensaje de que ya esta en uso
        if(!enUso){
            //NOTA: 'love' es una llave de encriptacion, es decir puede utilizarse cualquier string pero... debe ser la misma con la que se encripto
            req.body.contrasena= encode.encode(""+req.body.contrasena+"", 'base64')
            //Insert con la contraseña previamente encriptada
            await pool.query('INSERT INTO cliente set ?', req.body);
            res.status(200).json({ message: 'success'});
        }else{
            res.status(200).json({ message: 'El correo ingresado se encuentra en uso por otra cuenta'});
        }
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Error en los servicios'});
    }
};



module.exports = clienteCrtl;