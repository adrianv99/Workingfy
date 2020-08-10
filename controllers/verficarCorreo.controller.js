const pool = require('../db_connection');

//Esta funcion verifica si un correo esta en uso o no
async function verificarCorreo(correo) {

    var match = false;
    //verificamos si esta en uso en la tabla freelancer
    var correos = await pool.query("SELECT correo FROM freelancer WHERE estado='A' ");
    correos.forEach( (x) => {
        if(x.correo === correo){
            match = true;
        }
    });

    //verificamos si esta en uso en la tabla cliente
    correos = await pool.query("SELECT correo FROM cliente WHERE estado='A' ");
    correos.forEach( (x) => {
        if(x.correo === correo){
            console.log(correo);
            match = true;
        }
    });

    if(match){
        return true;
    }else{
        return false;
    }
    
}

module.exports = verificarCorreo;