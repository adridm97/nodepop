// conexion a la base de datos
const dbConnection = require('./lib/connectMongoose');

// modelo de anuncios
const Anuncio = require('./models/Anuncio');
const anuncioData = require('./anunciosIniciales.json');


main().catch(err => console.log('Hubo un error', err));

async function main() {
    await initAnuncios();

    dbConnection.close();
}

async function initAnuncios() {
    // elimino todos los documentos de la colección de anuncios
    const deleted = await Anuncio.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

    // crear anuncios iniciales
    const anuncios = await Anuncio.insertMany(anuncioData.anuncios);
    console.log(`Creados ${anuncios.length} anuncios.`);
}