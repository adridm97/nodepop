// conexion a la base de datos
const dbConnection = require("./lib/connectMongoose");
require("dotenv").config();
const readline = require("readline");
const mongoose = require("mongoose");

// modelo de anuncios
const { Anuncio, Usuario } = require("./models");
const anuncioData = require("./anunciosIniciales.json");

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  await new Promise((resolve) => dbConnection.once("open", resolve));
  if (
    !(await askYesNo("Estas seguro que quieres inicializar la BD? (yes/no)"))
  ) {
    console.log("Abortado el comando. No se ha borrado nada!");
    return process.exit(0);
  }
  await initAnuncios();

  await initUsuarios();
  mongoose.connection.close();
}

async function initAnuncios() {
  // elimino todos los documentos de la colección de anuncios
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crear anuncios iniciales
  const anuncios = await Anuncio.insertMany(anuncioData.anuncios);
  console.log(`Creados ${anuncios.length} anuncios.`);
}

async function initUsuarios() {
  const { deletedCount } = await Usuario.deleteMany();
  console.log(`Eliminados ${deletedCount} usuarios.`);

  const result = await Usuario.insertMany([
    {
      email: "user@example.com",
      password: await Usuario.hashPassword("1234"),
    },
  ]);
  console.log(`Insertados ${result.length} usuarios.`);
}

function askYesNo(questionText) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(questionText, (answer) => {
      rl.close();
      if (answer.toLowerCase() === "yes") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
