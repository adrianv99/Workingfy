const pool = require('../db_connection');

//ERROR CON AES_DECRYPT SE NECESITA ENCRIPTAR DIRECTAMENTE EN NODE .. Pendiente

const loginCrtl = {};
loginCrtl.sesion = async (req, res) => {
    try{
        //realizamos una  consulta para ver si el correo y la contraseña son correctos,
        //NOTA: 'love' es una llave de encriptacion, es decir puede utilizarse cualquier string pero... debe ser la misma con la que se encripto
        const correos = await pool.query("SELECT correo, AES_DECRYPT(contrasena,'love') contrasena FROM cliente WHERE correo='"+req.body.correo+"'");
        var match = false;
        correos.forEach( (x) => {
            if(x.correo === req.body.correo && x.contrasena === req.body.contrasena){
                match = true;
            }
        });

        //si la contraseña coincidio
        if(match === true){
            console.log('Se ha iniciado sesion correctamente') //preliminar
            res.status(200).json({ message: 'success'});
        }else{
            console.log('Correo o contraseña incorrectos') //preliminar
            res.status(200).json({ message: 'incorrecto'});
        }
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Error en los servicios'});
    }
};



module.exports = loginCrtl;