const express = require('express');
const path = require('path');
require('dotenv').config();

const { dbConnection } = require('./database/config')
dbConnection()

const app = express();

app.use(express.json())

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


app.use('/api/login', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Running at port: ', process.env.PORT);
});