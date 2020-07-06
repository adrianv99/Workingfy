const pool = require('../db_connection');

const clienteCrtl = {};

clienteCrtl.login = async (req, res) => {
    try{
        //realizamos una  consulta para ver si el correo y la contraseña son correctos,
        const correos = await pool.query('SELECT correo,AES_DECRYPT(contrasena,love) contrasena FROM cliente');
        var match = false;
        correos.forEach( (x) => {
            if(x.correo === req.body.correo && x.contrasena=== req.body.contrasena){
                match = true;
            }
        });

        //si la contraseña coincidio
        if(!match){
            console.log('si')
            res.status(200).json({ message: 'success'});
        }else{
            res.status(200).json({ message: 'incorrecto'});
        }
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Error en los servicios'});
    }
};



module.exports = clienteCrtl;