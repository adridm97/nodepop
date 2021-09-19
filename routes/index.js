var express = require('express');
const Anuncio = require('../models/Anuncio');
var router = express.Router();
const between = { '$gte': '10', '$lte': '50' };
const moreTen = { '$gte': '10' };
const lessFifty = { '$lte': '50' };
const equal = { precio: '50' };
/* GET home page. */
router.get('/', async function(req, res, next) {
    const nombre = req.query.nombre;
    const tags = req.query.tags;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const filtro = {};
    if (nombre) {
        filtro.nombre = new RegExp('^' + req.query.nombre, "i");
    }
    if (tags) {
        filtro.tags = tags;
    }
    if (venta) {
        filtro.venta = venta;
    }
    if (precio === '10-50') {
        filtro.precio = between;
    }
    if (precio === '10-') {
        filtro.precio = moreTen;
    }
    if (precio === '-50') {
        filtro.precio = lessFifty;
    }
    if (precio === 50) {
        filtro.precio = equal;
    }
    const anuncios = await Anuncio.find(filtro)
    res.render('index', { 'anuncios': anuncios })

});

module.exports = router;