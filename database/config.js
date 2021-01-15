const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
        })
        console.log('db');
    } catch (err) {
        console.log(err);
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConnection
}