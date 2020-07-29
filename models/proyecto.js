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



module.exports = proyecto;