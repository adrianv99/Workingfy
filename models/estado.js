const pool = require('../db_connection');

const estado = {};


estado.consultarPorPais = async (id) => {
    try{
        const estados = await pool.query(`SELECT * FROM estado WHERE id_pais=${id} `);
        return estados;
    }catch(error){
        console.log(error);
        return 'Error en los servicios de bd';
    }
};

module.exports = estado;