const pool = require('../db_connection');

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
        const correos = await pool.query('SELECT correo FROM cliente');
        var enUso = false;
        correos.forEach( (x) => {
            if(x.correo === req.body.correo){
                enUso = true;
            }
        });

        //si el correo no esta en uso, se inserta, sino el servidor responde con un mensaje de que ya esta en uso
        if(!enUso){
            //Insert mas especifico para asi encriptar la contraseña con la funcion de mysql AES_ENCRYPT
            const result = await pool.query("INSERT INTO `cliente` ( `nombre`, `apellido`, `correo`, `telefono`, `cedula`, `direccion`, `contrasena`, `estado`) VALUES ( '"+req.body.nombre+"', '"+req.body.apellido+"', '"+req.body.correo+"', '"+req.body.telefono+"', '"+req.body.cedula+"', '"+req.body.direccion+"', AES_ENCRYPT('"+req.body.contrasena+"','love'), '"+req.body.estado+"')");
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