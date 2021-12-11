"use strict";

const cote = require("cote");
const sharp = require("sharp");
//Declaro el microservicio
const responder = new cote.Responder({ name: "responder" });

//logica del microservicio
responder.on("thumbnail", (req, done) => {
  const { original, url } = req;

  const resultado = sharp("../" + url)
    .resize(100, 100)
    .toFile(`../public/images/thumbnails/mini${original}`, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
        done(info);
        console.log(
          `${original} se ha redimensionado en la carpeta thumbnails en el archivo mini${original}`
        );
      }
    });
});
