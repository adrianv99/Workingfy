const pool = require('../db_connection');
const encode = require('nodejs-base64-encode');

const cliente = {};

cliente.consultar = async () => {
    try{
        const clientes = await pool.query('SELECT * FROM cliente');
        return clientes
    }catch(error){
        console.log(error)
    }
};

cliente.consultarPorId = async (id) => {
    try{
        const cliente = await pool.query(`SELECT * FROM cliente WHERE id=${id}`);
        cliente[0].contrasena = encode.decode(""+cliente[0].contrasena+"", 'base64');
  
        return cliente;
    }catch(error){
        return `error: ${error}`;
    }
};

cliente.insertar = async (datos) => {
    try{
        //realizamos una  consulta para ver si el correo que envio el usuario esta en uso o no,
        //comprobando en la tabla freelancer
        var correos = await pool.query('SELECT correo FROM freelancer');
        var enUso = false;
        correos.forEach( (x) => {
            if(x.correo === datos.correo){
                enUso = true;
            }
        });
        //comprobando en la tabla cliente
        correos = await pool.query('SELECT correo FROM cliente');
        correos.forEach( (x) => {
            if(x.correo === datos.correo){
                enUso = true;
            }
        });

        //si el correo no esta en uso, se inserta, sino el servidor responde con un mensaje de que ya esta en uso
        if(!enUso){
            //NOTA: 'love' es una llave de encriptacion, es decir puede utilizarse cualquier string pero... debe ser la misma con la que se encripto
            datos.contrasena= encode.encode(""+datos.contrasena+"", 'base64')
            //Insert con la contraseña previamente encriptada
            await pool.query('INSERT INTO cliente set ?', datos);
            return 'success'
        }else{
            return 'El correo ingresado se encuentra en uso por otra cuenta'
        }
    }catch(error){
        return 'Error en los servicios'
    }
};



module.exports = cliente;