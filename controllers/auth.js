const { response } = require("express")
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { generateJWT } = require('../helpers/jwt')
const router = require("../routes/auth")

const createUser = async (req, res = response) => {
    const { email, password } = req.body
    try {
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(400).json({ ok: false, message: 'El correo ya esta registrado' })
        }
        const user = new User(req.body);
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
        await user.save()

        const token = await generateJWT(user.id)

        res.json({
            ok: true,
            message: 'Created user',
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Error with server' })
    }
}

const loginUser = async (req, res = response) => {
    const { email, password } = req.body
    try {
        const userDB = await User.findOne({ email })
        if (!userDB) {
            return res.status(404).json({ ok: false, message: 'No se encuentra el usuario' })
        }
        validPassword = bcrypt.compareSync(password, userDB.password)
        if (!validPassword) {
            return res.status(400).json({ ok: false, message: 'Contraseña incorrecta' })
        }
        const token = await generateJWT(userDB.id)
        res.json({
            ok: true,
            message: 'User logged',
            userDB,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Error with server' })
    }
}

const renewToken = async (req, res = response) => {
    res.json({ ok: true, message: 'Renewed', uid: req.uid })
}

module.exports = {
    createUser, loginUser, renewToken
}