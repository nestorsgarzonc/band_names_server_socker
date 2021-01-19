const { response } = require("express");
const User = require('../models/user')

const getUsers = async (req, res = response) => {
    const from = Number(req.query.from) || 0

    const users = await User.find({ _id: { $ne: req.uid } }).sort({ 'online': -1 }).skip(from).limit(20);
    res.json({ ok: true, message: 'res', users, from })
}

module.exports = { getUsers }