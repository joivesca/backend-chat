const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

//Read and body parse
app.use( express.json());

//DB Config
const { dbConnection } = require('./database/config')
dbConnection();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

//routes
app.use('/api/login', require('./routes/auth'))



server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


//M0ng0@Atl4s88