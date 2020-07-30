const pool = require('../db_connection');

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

//consulta para el explorar del freelancer
proyecto.consultar = async () => {
    try {
        
        const proyectos = await pool.query(`SELECT proyecto.id AS id, proyecto.asunto AS asunto, proyecto.detalle AS detalle,
        proyecto.id_freelancer AS id_freelancer, proyecto.seguimiento AS seguimiento, proyecto.fecha AS fecha,
        profesion.nombre AS profesion, estado.nombre AS nombre_estado, pais.nombre AS nombre_pais,
        cliente.nombre AS nombre_cliente, cliente.apellido AS apellido_cliente, cliente.id AS id_cliente
        FROM proyecto 
        INNER JOIN cliente ON proyecto.id_cliente = cliente.id
        INNER JOIN profesion ON proyecto.id_profesion = profesion.id
        INNER JOIN estado ON proyecto.ubicacion = estado.id
        INNER JOIN pais ON estado.id_pais = pais.id
        WHERE proyecto.seguimiento='iniciado'`);
        //OJO: Hay que crear una funcion donde verifique que el freelancer no este en la lista de interesados de algunos proyectos,
        //para que este no pueda enviar multiples solicitudes de trabajo
        return proyectos;

    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
};

proyecto.consultarPorProfesion = async (profesion) => {
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
        WHERE proyecto.id_profesion=${profesion} AND proyecto.seguimiento='iniciado'`);

        return proyectosPorProfesion;

    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
};

proyecto.consultarPorUbicacion = async (ubicacion) => {
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
        WHERE proyecto.ubicacion=${ubicacion} AND proyecto.seguimiento='iniciado'`);

        return proyectosPorUbicacion;

    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
};

proyecto.consultarPorFecha = async (inicio, fin) => {
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
        WHERE proyecto.seguimiento='iniciado' AND proyecto.fecha>='${inicio}' AND proyecto.fecha<='${fin}'`);
        console.log(inicio);
        console.log(fin);
        console.log(proyectosPorFecha);
        return proyectosPorFecha;

    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
};

proyecto.consultarProyectoFreelancer = async (id) => {
    try {
        
        const proyectos = await pool.query(`SELECT proyecto.id AS id, proyecto.asunto AS asunto, proyecto.detalle AS detalle,
        proyecto.id_freelancer AS id_freelancer, proyecto.seguimiento AS seguimiento,
        proyecto.fecha AS fecha, estado.nombre AS nombre_estado, pais.nombre AS nombre_pais,
        cliente.nombre AS nombre_trabajador, cliente.apellido AS apellido_trabajador
        FROM proyecto 
        INNER JOIN cliente ON proyecto.id_cliente = cliente.id
        INNER JOIN estado ON proyecto.ubicacion = estado.id
        INNER JOIN pais ON estado.id_pais = pais.id
        WHERE proyecto.id_freelancer=${id} AND proyecto.seguimiento='en curso'`);

        return proyectos;

    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
}

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
        freelancer.nombre AS nombre_trabajador, freelancer.apellido AS apellido_trabajador
        FROM proyecto 
        INNER JOIN freelancer ON proyecto.id_freelancer = freelancer.id
        INNER JOIN estado ON proyecto.ubicacion = estado.id
        INNER JOIN pais ON estado.id_pais = pais.id
        WHERE proyecto.id_cliente=${id} AND proyecto.seguimiento='en curso'`);
        
        const proyectos = proyectosEnCurso.concat(proyectosIniciados);

        return proyectos;
    } catch (error) {
        console.log(error)
        return 'Error en los servicios'
    }
}



module.exports = proyecto;