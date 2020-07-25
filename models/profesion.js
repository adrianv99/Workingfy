const pool = require('../db_connection');


const profesion = {};


profesion.consultar = async () => {
    try{
        const profesiones = await pool.query('SELECT * FROM profesion');
        return profesiones;
    }catch(error){
        return 'error en los servicios db';
    }
};



module.exports = profesion;
