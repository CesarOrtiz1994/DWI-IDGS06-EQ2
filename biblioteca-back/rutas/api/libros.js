const express = require("express")
const ControllerLibro = require('../../controllers/libros')
const RepositorioLibro = require('../../database/RepositorioLibro')
const controlador = new ControllerLibro(new RepositorioLibro());
const router = express.Router();

/** Consulta todos los libros */
router.get('/',async (req,res) =>{
    controlador.obtenerLibros()
    .then((libros) => res.json(libros)) 
});

/** Consulta un libro por id */
router.get('/id/:id',async (req,res) =>{
    console.log("Llega al router:", req.params)
    controlador.obtenerLibroPorId(req.params.id)
    .then((libros) => res.json(libros)) 
});

/** Guarda un libro */
router.post('/',async (req,res) => {
    controlador.agregarLibro(req.body)
    res.status(200)
    res.json({ message : req.body.titulo})
});

/** Actualiza un libro */
router.put('/',async (req,res) => {
    controlador.actualizarLibro(req.body)
    res.status(200)
    res.json({ message : "Se actualizo bien"})
});

/** Elimina un libro */
router.delete('/',async (req,res) => {
    controlador.eliminarLibro(req.body.id)
    res.status(200)
    res.json({ message : "Se elimino bien"})
});

module.exports = router;