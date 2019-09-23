const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});
router.post('/signup', (req, res) => {
    console.log(req.body);
    res.send('Registrado correctamente');
});
router.get('/login', (req, res) => {
    res.render('auth/login');
});
router.post('/login', (req, res) => {
    console.log(req.body);
    res.render('products/index')
});
router.get('/profile', (req, res) => {
    res.send('bienvenido a tu perfil');
});

module.exports = router;