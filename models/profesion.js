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

profesion.consultarPorId = async (id) => {
    try{
        const profesion = await pool.query(`SELECT * FROM profesion WHERE id=${id}`);
        return profesion;
    }catch(error){
        console.log(error);
        return 'Error en los servicios de bd';
    }
};



module.exports = profesion;
