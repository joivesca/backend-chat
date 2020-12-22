/*
    path: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.post('/new', [
    check('name', 'Name mandatory').not().isEmpty(), 
    check('password','Password mandatory').not().isEmpty(),
    check('email', 'Email mandatory').isEmail(),
    validateFields], createUser);

router.post('/', [
    check('password','Password mandatory').not().isEmpty(),
    check('email', 'Email mandatory').isEmail(),
], login);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
