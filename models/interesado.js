const pool = require('../db_connection');


const interesado = {};


interesado.insertar = async (datos) => {
    try{
        await pool.query('INSERT INTO interesado set ?', datos);
        return 'success';
    }catch(error){
        console.log(error);
        return 'error en los servicios db';
    }
};

interesado.consultar = async (id_proyecto) => {
    try {
        const interesados = await pool.query(`SELECT interesado.id AS id, interesado.id_proyecto AS id_proyecto,
        interesado.id_freelancer AS id_freelancer, freelancer.nombre AS nombre_freelancer, freelancer.apellido AS apellido_freelancer
        FROM interesado INNER JOIN freelancer ON interesado.id_freelancer = freelancer.id
        WHERE interesado.id_proyecto=${id_proyecto}`);

        return interesados
    } catch (error) {
        console.log(error);
        return 'error en los servicios db';
    }
}

interesado.contratar = async (id_proyecto, id_freelancer) => {
    try {
        await pool.query(`UPDATE proyecto SET id_freelancer=${id_freelancer}, seguimiento='en curso' 
        WHERE id=${id_proyecto}`);
        return 'success'
    } catch (error) {
        console.log(error);
        return 'error en los servicios db';
    }
}


module.exports = interesado;