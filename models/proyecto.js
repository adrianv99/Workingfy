const pool = require('../db_connection');

//controllers
const verificarInteresados = require('../controllers/verificarInteresados.controller');
const verificarFinalizacion = require('../controllers/verificarFinalizacion.controller');

const proyecto = {};


proyecto.insertar = async (datos) => {
    try{
     
        await pool.query('INSERT INTO proyecto set ?', datos);
        return 'success'

    }catch(error){
        console.log(error)
        return 'Error en los servicios'
    }
};

proyecto.calificar = async (datos, user_type) => {
    try {
        //si el usuario que desea calificar el trabajo es de tipo cliente,
        // entonces le agregara estrellas al perfil del usuario freelancer que realizo el trabajo
        if(user_type === 'Cliente') {
            //obteniendo el total de estrellas anteriores
            // y sumando las anteriores con las nuevas que le selecciono el cliente
            const estrellasAnteriores = await pool.query(`SELECT rating FROM freelancer WHERE id=${datos.id_user}`);
            let totalEstrellas = estrellasAnteriores[0].rating + datos.estrellas;
        
            await pool.query(`UPDATE freelancer SET rating=${totalEstrellas} WHERE id=${datos.id_user}`);
            await pool.query(`UPDATE proyecto SET rating_freelancer='calificado' WHERE id=${datos.id_proyecto}`);

        }

        //si el usuario que desea calificar el trabajo es de tipo freelancer,
        // entonces le agregara estrellas al perfil del usuario cliente con el que trabajo
        if(user_type === 'Freelancer') {
            //obteniendo el total de estrellas anteriores
            // y sumando las anteriores con las nuevas que le selecciono el cliente
            const estrellasAnteriores = await pool.query(`SELECT rating FROM cliente WHERE id=${datos.id_user}`);
            let totalEstrellas = estrellasAnteriores[0].rating + datos.estrellas;
        
            await pool.query(`UPDATE cliente SET rating=${totalEstrellas} WHERE id=${datos.id_user}`);
            await pool.query(`UPDATE proyecto SET rating_cliente='calificado' WHERE id=${datos.id_proyecto}`);

        }

        //funcion que finaliza el proyecto
        await verificarFinalizacion(datos.id_proyecto);

        return 'success'
    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
}

//consulta para el explorar del freelancer
proyecto.consultar = async (id_freelancer) => {
    try {
        
        const todosLosProyectos = await pool.query(`SELECT proyecto.id AS id, proyecto.asunto AS asunto, proyecto.detalle AS detalle,
        proyecto.id_freelancer AS id_freelancer, proyecto.seguimiento AS seguimiento, proyecto.fecha AS fecha,
        profesion.nombre AS profesion, estado.nombre AS nombre_estado, pais.nombre AS nombre_pais,
        cliente.nombre AS nombre_cliente, cliente.apellido AS apellido_cliente, cliente.id AS id_cliente
        FROM proyecto 
        INNER JOIN cliente ON proyecto.id_cliente = cliente.id
        INNER JOIN profesion ON proyecto.id_profesion = profesion.id
        INNER JOIN estado ON proyecto.ubicacion = estado.id
        INNER JOIN pais ON estado.id_pais = pais.id
        WHERE proyecto.seguimiento='iniciado' ORDER BY proyecto.id DESC`);
        
        //Filtramos los proyectos a proyectos que el freelancer
        //no le ha enviado solicitud de trabajo (para evitar que le envie de nuevo)
        const proyectos = await verificarInteresados(todosLosProyectos ,id_freelancer);
        
        return proyectos;

    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
};

proyecto.consultarPorProfesion = async (profesion, id_freelancer) => {
    try {

        const proyectosPorProfesion = await pool.query(`SELECT proyecto.id AS id, proyecto.asunto AS asunto, proyecto.detalle AS detalle,
        proyecto.id_freelancer AS id_freelancer, proyecto.seguimiento AS seguimiento, proyecto.fecha AS fecha, 
        profesion.nombre AS profesion, estado.nombre AS nombre_estado, pais.nombre AS nombre_pais,
        cliente.nombre AS nombre_cliente, cliente.apellido AS apellido_cliente, cliente.id AS id_cliente
        FROM proyecto 
        INNER JOIN cliente ON proyecto.id_cliente = cliente.id
        INNER JOIN profesion ON proyecto.id_profesion = profesion.id
        INNER JOIN estado ON proyecto.ubicacion = estado.id
        INNER JOIN pais ON estado.id_pais = pais.id
        WHERE proyecto.id_profesion=${profesion} AND proyecto.seguimiento='iniciado' ORDER BY proyecto.id DESC`);

        //Filtramos los proyectos a proyectos que el freelancer
        //no le ha enviado solicitud de trabajo (para evitar que le envie de nuevo)
        const proyectos = await verificarInteresados(proyectosPorProfesion ,id_freelancer);
        
        return proyectos;

    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
};

proyecto.consultarPorUbicacion = async (ubicacion, id_freelancer) => {
    try {

        const proyectosPorUbicacion = await pool.query(`SELECT proyecto.id AS id, proyecto.asunto AS asunto, proyecto.detalle AS detalle,
        proyecto.id_freelancer AS id_freelancer, proyecto.seguimiento AS seguimiento, proyecto.fecha AS fecha, 
        profesion.nombre AS profesion, estado.nombre AS nombre_estado, pais.nombre AS nombre_pais,
        cliente.nombre AS nombre_cliente, cliente.apellido AS apellido_cliente, cliente.id AS id_cliente
        FROM proyecto 
        INNER JOIN cliente ON proyecto.id_cliente = cliente.id
        INNER JOIN profesion ON proyecto.id_profesion = profesion.id
        INNER JOIN estado ON proyecto.ubicacion = estado.id
        INNER JOIN pais ON estado.id_pais = pais.id
        WHERE proyecto.ubicacion=${ubicacion} AND proyecto.seguimiento='iniciado' ORDER BY proyecto.id DESC`);

        //Filtramos los proyectos a proyectos que el freelancer
        //no le ha enviado solicitud de trabajo (para evitar que le envie de nuevo)
        const proyectos = await verificarInteresados(proyectosPorUbicacion ,id_freelancer);
        
        return proyectos;

    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
};

proyecto.consultarPorFecha = async (inicio, fin, id_freelancer) => {
    try {

        const proyectosPorFecha = await pool.query(`SELECT proyecto.id AS id, proyecto.asunto AS asunto, proyecto.detalle AS detalle,
        proyecto.id_freelancer AS id_freelancer, proyecto.seguimiento AS seguimiento, proyecto.fecha AS fecha, 
        profesion.nombre AS profesion, estado.nombre AS nombre_estado, pais.nombre AS nombre_pais,
        cliente.nombre AS nombre_cliente, cliente.apellido AS apellido_cliente, cliente.id AS id_cliente
        FROM proyecto 
        INNER JOIN cliente ON proyecto.id_cliente = cliente.id
        INNER JOIN profesion ON proyecto.id_profesion = profesion.id
        INNER JOIN estado ON proyecto.ubicacion = estado.id
        INNER JOIN pais ON estado.id_pais = pais.id
        WHERE proyecto.seguimiento='iniciado' AND proyecto.fecha>='${inicio}' AND proyecto.fecha<='${fin}' ORDER BY proyecto.id DESC`);
        
        //Filtramos los proyectos a proyectos que el freelancer
        //no le ha enviado solicitud de trabajo (para evitar que le envie de nuevo)
        const proyectos = await verificarInteresados(proyectosPorFecha ,id_freelancer);
        
        return proyectos;

    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
};

//consulta para los proyectos que se vizualizan en el panel del freelancer (proyectos con los que trabaja)
proyecto.consultarProyectoFreelancer = async (id) => {
    try {
        
        const proyectos = await pool.query(`SELECT proyecto.id AS id, proyecto.asunto AS asunto, proyecto.detalle AS detalle,
        proyecto.id_freelancer AS id_freelancer, proyecto.seguimiento AS seguimiento,
        proyecto.fecha AS fecha, estado.nombre AS nombre_estado, pais.nombre AS nombre_pais,
        cliente.nombre AS nombre_trabajador, cliente.apellido AS apellido_trabajador, cliente.id AS id_trabajador
        FROM proyecto 
        INNER JOIN cliente ON proyecto.id_cliente = cliente.id
        INNER JOIN estado ON proyecto.ubicacion = estado.id
        INNER JOIN pais ON estado.id_pais = pais.id
        WHERE proyecto.id_freelancer=${id} AND proyecto.seguimiento='en curso' AND proyecto.rating_cliente<>'calificado'`);

        return proyectos;

    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
}

//consulta para los proyectos que se vizualizan en el panel del cliente (proyectos con los que trabaja)
proyecto.consultarProyectoCliente = async (id) => {
    try {
        //Consulta a los proyectos iniciados
        const proyectosIniciados = await pool.query(`SELECT proyecto.id AS id, proyecto.asunto AS asunto, proyecto.detalle AS detalle,
        proyecto.id_freelancer AS id_freelancer, proyecto.seguimiento AS seguimiento,
        proyecto.fecha AS fecha, estado.nombre AS nombre_estado, pais.nombre AS nombre_pais 
        FROM proyecto 
        INNER JOIN estado ON proyecto.ubicacion = estado.id
        INNER JOIN pais ON estado.id_pais = pais.id
        WHERE proyecto.id_cliente=${id} AND proyecto.seguimiento='iniciado'`);

        //Consulta a los proyectos en curso
        const proyectosEnCurso = await pool.query(`SELECT proyecto.id AS id, proyecto.asunto AS asunto, proyecto.detalle AS detalle,
        proyecto.id_freelancer AS id_freelancer, proyecto.seguimiento AS seguimiento,
        proyecto.fecha AS fecha, estado.nombre AS nombre_estado, pais.nombre AS nombre_pais,
        freelancer.nombre AS nombre_trabajador, freelancer.apellido AS apellido_trabajador, freelancer.id AS id_trabajador
        FROM proyecto 
        INNER JOIN freelancer ON proyecto.id_freelancer = freelancer.id
        INNER JOIN estado ON proyecto.ubicacion = estado.id
        INNER JOIN pais ON estado.id_pais = pais.id
        WHERE proyecto.id_cliente=${id} AND proyecto.seguimiento='en curso' AND proyecto.rating_freelancer<>'calificado' `);
        
        const proyectos = proyectosEnCurso.concat(proyectosIniciados);

        return proyectos;
    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
}

proyecto.consultarProyectosFinalizados = async (user_type, user_id) => {
    try {
        
        //proyectos terminados por el cliente
        if(user_type === 'Cliente') {
            const proyectos = await pool.query(`SELECT * FROM proyecto WHERE id_cliente=${user_id} AND seguimiento='finalizado'`);
            return proyectos;
        }

        //proyectos terminados por el freelancer
        if(user_type === 'Freelancer') {
            const proyectos = await pool.query(`SELECT * FROM proyecto WHERE id_freelancer=${user_id} AND seguimiento='finalizado'`);
            return proyectos;
        }

        
    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
}



module.exports = proyecto;