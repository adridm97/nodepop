## Para inicializar el proyecto

Lo primero es instalar npm:
```sh
npm install
```
## Dependencias:
Mongoose:
```sh
npm install mongoose
```
cross-env:
```sh
npm install cross-env
```
Nodemon:
```sh
npm install --save-dev nodemon cross-env
```

## Desarrollo

Ejecutamos este fichero para eliminar las tablas de la base de datos y volver a cargarlas.

```sh
node initDB.js
```

Para arranar el proyecto en modo desarrollo usamos:
```sh
npm run dev
```


## Recordatorio de como se arranca MongoDB en Mac

```sh
./bin/mongod --dbpath ./data/db
```

## Filtros:

Por nombre:
Si pasamos como parametro cualquier letra, buscará los que empiecen por dicha letra, es decir:

nombre=f
Devolverá funda iPhone.

Precio:
10-50 :devuelve los anuncios con precio entre esos dos numeros.
10- :Todos los anuncios con precio superior a 10
-50 :Todos los anuncios con precio inferior a 50
50 :Todos los anuncios que el precio sea igual a 50

tags:
Filtrar por los diferentes tags, si vamos a la ruta /tags/lista nos devuelve una lista de los tags que hay en nuestra api.

Venta:
Si el archivo esta en venta o no (lo muestra como true o false).

ID:
Podemos buscar un artículo a traves de su id.

También podemos usar los filtros prediseñados skip, limit y sort.

## API:

```sh
/api/anuncios 
```
nos muestra un json de los anuncios existentes.
