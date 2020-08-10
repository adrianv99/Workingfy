const nodemailer = require('nodemailer');


//funcion que envia correos electronicos
async function enviarCorreo( correo ) {

    try {

    // utilizamos a gmail con el protocolo smtp
    // con una cuenta de prueba (workingfy09)
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'workingfy09@gmail.com',
            pass: 'workingfy1234!' // contacta con el desarrollador para que te facilite la clave
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    //envido del correo
    let info = await transporter.sendMail({
        from: '"Workingfy" <workingfy09@gmail.com>', 
        to: correo.destinatario,
        subject: correo.asunto,
        text: correo.cuerpo
        //html: contentHTML
    })

    //console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return 'correo enviado';

    } catch (error) {
        console.log(error);
        return 'Error al enviar el correo';
    }
}

module.exports = enviarCorreo