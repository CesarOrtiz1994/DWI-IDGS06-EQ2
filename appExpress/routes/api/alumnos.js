const express = require("express")
const Controller = require('../../controller/Alumnos')
const RepositorioAlumno = require('../../database/RepositorioAlumno')
const controlador = new Controller(new RepositorioAlumno());
const router = express.Router();

router.get('/',async (req,res) =>{
    controlador.obtenerAlumnos()
    .then((alumnos) => res.json(alumnos)) 
});

router.post('/',async (req,res) => {
    controlador.agregarAlumno(req.body.name, req.body.email)
    res.status(200)
    res.json({ message : req.body.name})
});

module.exports = router;