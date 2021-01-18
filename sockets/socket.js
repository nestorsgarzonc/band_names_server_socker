const { io } = require('../index');
const { checkJWTSocket } = require('../helpers/jwt');
const { connectedUser, disconnectedUser } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', async (client) => {
    console.log('Client connected');
    console.log(client.handshake.headers['x-token']);
    const [isValid, uid] = checkJWTSocket(client.handshake.headers['x-token'])
    if (!isValid) {
        return client.disconnect();
    }

    await connectedUser(uid)

    client.on('disconnect', () => {
        console.log('Client disconnected');
        await disconnectedUser(uid)
    });
});
