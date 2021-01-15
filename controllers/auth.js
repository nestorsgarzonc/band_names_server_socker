const { response } = require("express")
const bcrypt = require('bcryptjs')
const User = require('../models/user')

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
        const result = await user.save()
        res.json({
            ok: true,
            message: 'Created user',
            result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Error with server' })
    }
}

module.exports = {
    createUser
}