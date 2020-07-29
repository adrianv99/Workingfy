const pool = require('../db_connection');

const pais = {};


pais.consultar = async () => {
    try{
        const paises = await pool.query('SELECT * FROM pais');
        return paises;
    }catch(error){
        console.log(error);
        return 'Error en los servicios de bd';
    }
};

module.exports = pais;