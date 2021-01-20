const { io } = require('../index');
const { checkJWTSocket } = require('../helpers/jwt');
const { connectedUser, disconnectedUser } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Client connected');
    console.log(client.handshake.headers['x-token']);
    const [isValid, uid] = checkJWTSocket(client.handshake.headers['x-token'])
    if (!isValid) {
        return client.disconnect();
    }

    connectedUser(uid)

    client.join(uid)
    client.on('personal-message', (payload) => {
        console.log(payload);
        io.to(payload.to).emit('personal-message', payload)
    })
    client.on('disconnect', () => {
        console.log('Client disconnected');
        disconnectedUser(uid)
    });
});
