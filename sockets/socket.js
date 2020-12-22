const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    //https://www.xvideos.com/video16153371/latina_webcam_anna_ferrari

    /*client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });*/


});
