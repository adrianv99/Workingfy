const pool = require('../db_connection');

//Esta funcion retorna los proyectos donde el freelancer no ha enviado solicitud de trabajo, 
//para evitar que este envie multiples solicitudes a un mismo proyecto 
async function verificarInteresado(projects, freelancer) {

    //declaramos un arreglo que tendra los proyectos filtrados,
    //donde el usuario no le haya mandado solicitud 
    var newsProjects = []

    //recorremos los proyectos que recibimos por parametros y validamos
    //si este y el freelancer estan agregados en la tabla de interesados
    //si no lo estan, entonces pasaran a los proyectos que el puede ver (newsProyects)
    for(x = 0; x < projects.length; x++){
        var result = await pool.query(`SELECT * FROM interesado WHERE id_proyecto=${projects[x].id} AND id_freelancer=${freelancer}`);
        if(result.length === 0){
            newsProjects.push(projects[x]);
        }
    }
    
    return newsProjects;
    
}

module.exports = verificarInteresado;