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

app.use('/api/books',libros)
app.use("/api/categories", categoriesRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servicio iniciado correctamente en el puerto ${process.env.PORT || 3000}`)
})