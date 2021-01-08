const { io } = require('../index')

io.on('connection', client => {
    console.log('Connected');

    client.on('disconnect', () => {
        console.log('Disconnect');
    })

    client.on('message', (payload) => {
        console.log(payload);
        console.log('message')
        io.emit('message', { admin: 'New message' })
    })
})
