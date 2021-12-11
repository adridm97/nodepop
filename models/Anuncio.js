"use strict";
const mongoose = require("mongoose");

//Definimos el esquema de Anuncio
const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String],
});

anuncioSchema.statics.lista = function (filtro, skip, limit, sort) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  return query.exec();
};
const Anuncio = mongoose.model("Anuncio", anuncioSchema);

module.exports = Anuncio;
