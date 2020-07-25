const jwt = require('jsonwebtoken');

async function verificarToken(req, res, next) {

    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No posees un token de acceso' });
    }
    
    //descodifica el token  recibido y saca el id
    //guarda el id en el objeto request (req.userId), luego sigue con la otra funcion
    const decoded = await jwt.verify(token, 'oK15w9nX');
    req.userId = decoded.id;
    req.roll = decoded.roll;
    console.log(req.roll);
    console.log(req.userId);
    next();

}

module.exports = verificarToken;