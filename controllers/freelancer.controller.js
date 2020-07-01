const pool = require('../db_connection');

const freelancerCrtl = {};


freelancerCrtl.consultar = async (req, res) => {
    try{
        const freelancer = await pool.query('SELECT * FROM freelancer');
        console.log(freelancer);
        res.status(200).json(freelancer);
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error en los servicios'});
    }
};

freelancerCrtl.insertar = async (req, res) => {
    try{
        //realizamos una  consulta para ver si el correo que envio el usuario esta en uso o no,
        const correos = await pool.query('SELECT correo FROM freelancer');
        var enUso = false;
        correos.forEach( (x) => {
            if(x.correo === req.body.correo){
                enUso = true;
            }
        });
       

        //si el correo no esta en uso, se inserta, sino el servidor responde con un mensaje de que ya esta en uso
        if(!enUso){
            const result = await pool.query('INSERT INTO freelancer set ?', req.body);
            res.status(200).json({ message: 'success'});
        }else{
            res.status(200).json({ message: 'El correo ingresado se encuentra en uso por otra cuenta'});
        }
    }catch(error){
        console.log(error)
        res.status(500).json({ message: 'Error en los servicios'});
    }
};



module.exports = freelancerCrtl;