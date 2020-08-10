const pool = require('../db_connection');
const encode = require('nodejs-base64-encode');

const verificarCorreo = require('../controllers/verficarCorreo.controller');

const cliente = {};


cliente.consultarPorId = async (id) => {
    try{
        const cliente = await pool.query(`SELECT * FROM cliente WHERE id=${id}`);
        //desencriptando contrasena
        cliente[0].contrasena = encode.decode(""+cliente[0].contrasena+"", 'base64');
  
        return cliente;
    }catch(error){
        console.log(error)
        return 'Error en los servicios de db';
    }
};

cliente.consultarRating = async(id) => {
    try{
        const totalEstrellas = await pool.query(`SELECT rating FROM cliente WHERE id=${id}`);
        const totalProyectosEvaluados = await pool.query(`SELECT COUNT(rating_cliente) AS totalProyectosEvaluados FROM proyecto 
        WHERE id_cliente=${id} AND rating_cliente='calificado'`);

        let promedio = 0;
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
        return 'Error en los servicios de db';
    }
}

cliente.editar = async (datos, correoNuevo) => {
    try {
        var enUso = false;
        if(correoNuevo){
            enUso = await verificarCorreo(datos.correo);
        }

        //si el correo no esta en uso, se inserta, 
        //sino el servidor responde con un mensaje de que ya esta en uso
        if(!enUso){

            datos.contrasena= encode.encode(""+datos.contrasena+"", 'base64')
    
            await pool.query(`UPDATE cliente set nombre='${datos.nombre}', apellido='${datos.apellido}', correo='${datos.correo}',
            telefono='${datos.telefono}', direccion='${datos.direccion}', contrasena='${datos.contrasena}'
            WHERE id=${datos.id}`);
            return 'success'
        }else{
            return 'El correo ingresado se encuentra en uso por otra cuenta'
        }
    } catch (error) {
        console.log(error);
        return 'Error en los servicios de db'
    }
};

cliente.insertar = async (datos) => {
    try{
        
        var enUso = await verificarCorreo(datos.correo);
        //si el correo no esta en uso, se inserta, 
        //sino el servidor responde con un mensaje de que ya esta en uso
        if(!enUso){
            //NOTA: 'love' es una llave de encriptacion, es decir puede utilizarse cualquier string pero... debe ser la misma con la que se encripto
            datos.contrasena= encode.encode(""+datos.contrasena+"", 'base64')
          
            await pool.query('INSERT INTO cliente set ?', datos);
            return 'success'
        }else{
            return 'El correo ingresado se encuentra en uso por otra cuenta'
        }
    }catch(error){
        console.log(error);
        return 'Error en los servicios de db'
    }
};

cliente.eliminar = async (id) => {
    try {
    
        await pool.query(`UPDATE cliente set estado='I' WHERE id=${id}`);
        return 'success';
    } catch (error) {
        console.log(error);
        return 'Error en los servicios de db'
    }
};


module.exports = cliente;