const express = require('express');
const Controller = require('../controller/Alumnos');
const RepositoryAlumno = require('../database/RepositorioAlumno');
const controlador = new Controller(new RepositoryAlumno());
const router = express.Router();

router.get('/', async (req, res) => {
    controlador.obtenerAlumnos()
    .then((alumnos) => {
        res.render('./alumnos/Lista.ejs', {
            pageName: "Alumnos",
            alumnos: alumnos
        })
    })
});

router.get('/Registro', async (req, res) => {
    res.render('./alumnos/Formulario.ejs', {
        pageName: "Alumnos"
    })
});

router.post('/', async (req, res) => {
    var nombre = req.body.nombre;
    var email = req.body.email;
    controlador.agregarAlumno(nombre, email).then(() => {
    controlador.obtenerAlumnos()
    .then((alumnos) => {    
        res.render('./alumnos/Lista.ejs', {
            pageName: "Alumnos",
            alumnos: alumnos
        })
    })
    })
});

module.exports = router;