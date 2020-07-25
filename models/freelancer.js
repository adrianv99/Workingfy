const pool = require('../db_connection');
const encode = require('nodejs-base64-encode');

const freelancer = {};


freelancer.consultar = async () => {
    try{
        const freelancers = await pool.query('SELECT * FROM freelancer');
        return freelancers
    }catch(error){
        return 'error en los serivcios'
    }
};

freelancer.consultarPorId = async (id) => {
    try{
        const freelancer = await pool.query(`SELECT * FROM freelancer WHERE id=${id}`);
        freelancer[0].contrasena = encode.decode(""+freelancer[0].contrasena+"", 'base64');

        return freelancer;
    }catch(error){
        console.log(error);
        return 'Error en los servicios de bd';
    }
};

freelancer.insertar = async (datos) => {
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
            datos.contrasena= encode.encode(""+datos.contrasena+"", 'base64')
            await pool.query('INSERT INTO freelancer set ?', datos);
            return 'success'
        }else{
            return 'El correo ingresado se encuentra en uso por otra cuenta'
        }
    }catch(error){
        console.log(error)
        return 'Error en los servicios'
    }
};



module.exports = freelancer;