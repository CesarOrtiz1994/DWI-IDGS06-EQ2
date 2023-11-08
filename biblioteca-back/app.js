const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

const libros = require("./rutas/api/libros");

app.use('/api/libro',libros)

app.listen(3000, () => {
  console.log("Servicio iniciado correctamente.")
})