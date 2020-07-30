const pool = require('../db_connection');
const encode = require('nodejs-base64-encode');

const verificarCorreo = require('../controllers/verficarCorreo.controller');

const freelancer = {};

freelancer.consultar = async () => {
    try {
        const freelancers = await pool.query(`SELECT freelancer.id AS id, freelancer.nombre AS nombre, freelancer.apellido AS apellido,
        freelancer.correo AS correo, freelancer.telefono AS telefono, freelancer.direccion AS direccion, profesion.nombre AS profesion
        FROM freelancer
        INNER JOIN profesion ON freelancer.id_profesion = profesion.id`);

        return freelancers;
    } catch (error) {
        console.log(error);
        return 'Error en los servicios de bd';
    }
};

freelancer.consultarPorProfesion = async (id_profesion) => {
    try {
        const freelancers = await pool.query(`SELECT freelancer.id AS id, freelancer.nombre AS nombre, freelancer.apellido AS apellido,
        freelancer.correo AS correo, freelancer.telefono AS telefono, freelancer.direccion AS direccion, profesion.nombre AS profesion
        FROM freelancer
        INNER JOIN profesion ON freelancer.id_profesion = profesion.id
        WHERE freelancer.id_profesion=${id_profesion}`);

        return freelancers;
    } catch (error) {
        console.log(error);
        return 'Error en los servicios de bd';
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

freelancer.consultarRating = async(id) => {
    try{
        const totalEstrellas = await pool.query(`SELECT rating FROM freelancer WHERE id=${id}`);
        const totalProyectosEvaluados = await pool.query(`SELECT COUNT(rating_freelancer) AS totalProyectosEvaluados FROM proyecto 
        WHERE id_freelancer=${id} AND rating_freelancer='Evaluado'`);

        const promedio = 0;
        // evitando una division 0/0
        if(totalProyectosEvaluados[0].totalProyectosEvaluados !== 0){
            promedio = totalEstrellas[0].rating / totalProyectosEvaluados[0].totalProyectosEvaluados;
        }

        const rating = {
            totalEstrellas: totalEstrellas[0].rating,
            totalProyectosEvaluados: totalProyectosEvaluados[0].totalProyectosEvaluados,
            promedio
        }

        return rating;
    }catch(error){
        console.log(error);
        return 'Error en los servicios de bd';
    }
}

freelancer.editar = async (datos, correoNuevo) => {
    try {
        var enUso = false;
        if(correoNuevo){
            enUso = await verificarCorreo(datos.correo);
        }

        //si el correo no esta en uso, se inserta, 
        //sino el servidor responde con un mensaje de que ya esta en uso
        if(!enUso){

            datos.contrasena= encode.encode(""+datos.contrasena+"", 'base64')
    
            await pool.query(`UPDATE freelancer set ? WHERE id=${datos.id}`, datos);
            return 'success'
        }else{
            return 'El correo ingresado se encuentra en uso por otra cuenta'
        }
    } catch (error) {
        console.log(error);
        return 'Error en los servicios de db'
    }
};

freelancer.insertar = async (datos) => {
    try{

        var enUso = await verificarCorreo(datos.correo);
        //si el correo no esta en uso, se inserta, 
        //sino el servidor responde con un mensaje de que ya esta en uso
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