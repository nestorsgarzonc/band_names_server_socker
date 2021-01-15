///Path: api/login
const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate_jwt');
const { validateCampos } = require('../middlewares/validate_res')

const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'Revisa el correo').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateCampos,
], createUser)

router.post('/', [
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'Revisa el correo').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateCampos,
], loginUser)

router.get('/renew', validateJWT, renewToken);

module.exports = router