'use strict'
const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');
const validator = require('express-validator');

const between = { '$gte': '10', '$lte': '50' };
const moreTen = { '$gte': '10' };
const lessFifty = { '$lte': '50' };
const equal = { precio: '50' };
// GET /api/anuncios
// Devuelve una lista de anuncios
router.get('/', async(req, res, next) => {
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
    const anuncios = await Anuncio.lista(filtro, skip, limit, sort);
    res.json({ results: anuncios });
});

// GET /api/anuncios:id
// Obtener un anuncio
router.get('/:identificador', async(req, res, next) => {
    try {
        const _id = req.params.identificador;

        const anuncio = await Anuncio.find({ _id: _id });
        res.json({ result: anuncio });
    } catch (err) {
        next(err);
    }
});

// POST /api/anuncios (body)
// Crear un anuncio
router.post('/', async(req, res, next) => {
    try {
        const anuncioData = req.body;

        const anuncio = new Anuncio(anuncioData);

        const anuncioCreado = await anuncio.save();

        res.status(201).json({ result: anuncioCreado });

    } catch (err) {
        next(err);
    }
});

// DELETE /api/anuncios:id
// Elimina un anuncio
router.delete('/:id', async(req, res, next) => {
    try {
        const _id = req.params.id;

        await Anuncio.deleteOne({ _id: _id });
        res.json();
    } catch (err) {
        next(err);
    }
});

// PUT /api/anuncios:id (body)
// Actualizar un anuncio
router.put('/:id', async(req, res, next) => {
    try {
        const _id = req.params.id;
        const anuncioData = req.body;

        const anuncioActualizado = await Anuncio.findOneAndUpdate({ _id: _id }, anuncioData, {
            new: true // esto es para que me devuelva el estado final del documento
        });

        if (!anuncioActualizado) {
            res.status(404).json({ error: 'not found' });
            return;
        }

        res.json({ result: anuncioActualizado });
    } catch (err) {
        next(err);
    }
});
module.exports = router;