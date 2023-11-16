const express = require("express")
const ControllerUsuario = require('../../controller/Usuario');
const RepositorioUsusario = require('../../database/RepositorioUser')
const router = express.Router();
const controlador = new ControllerUsuario(new RepositorioUsusario());

router.post('/', async (req, res) => {
    controlador.agregarUsuario(req.body.username, req.body.password)
    console.log(req.body.username)
    res.status(200)
    res.json({
        message: "Usuario registrado con exito"
    })
})

module.exports = router;