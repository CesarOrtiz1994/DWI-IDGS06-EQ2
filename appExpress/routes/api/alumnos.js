const express = require('express');
const Controller = require('../../controller/Alumnos');
const RepositoryAlumno = require('../../database/RepositorioAlumno');
const controlador = new Controller(new RepositoryAlumno());
const router = express.Router();

router.get('/', async (req, res) => {
    controlador.obtenerAlumnos()
    .then((alumnos) => res.json(alumnos))
});

router.post('/', async (req, res) => {
    controlador.agregarAlumno(req.body.name, req.body.email)
    res.status(200)
    res.json({
        message: 'Alumno creado' + req.body.name
    });
});

module.exports = router;