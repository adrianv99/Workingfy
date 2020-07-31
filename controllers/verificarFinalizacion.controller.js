const pool = require('../db_connection');

//Esta funcion verifica si se termino el proyecto o no 
async function verificarFinalizacion(project) {

    const result = await pool.query(`SELECT rating_cliente, rating_freelancer FROM proyecto WHERE id=${project}`);

    //verificamos si ambas partes se calificaron (osean que le dieron a finalizar)
    if(result[0].rating_cliente === 'calificado' && result[0].rating_freelancer === 'calificado'){
        await pool.query(`UPDATE proyecto SET seguimiento='finalizado' WHERE id=${project}`);
    }
    
}

module.exports = verificarFinalizacion;