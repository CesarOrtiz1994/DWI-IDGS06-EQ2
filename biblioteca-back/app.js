const dotenv = require('dotenv');
dotenv.config({ path: ".env" });
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

const libros = require("./rutas/api/libros");
const categoriesRouter = require("./rutas/api/categories")
const usuario = require("./rutas/api/usuarios");

app.use('/api/books',libros)
app.use("/api/categories", categoriesRouter)
app.use("/api/usuarios", usuario)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servicio iniciado correctamente en el puerto ${process.env.PORT || 3000}`)
})