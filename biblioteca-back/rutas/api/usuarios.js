const express = require("express")
const ControllerUsuario = require('../../controllers/Usuarios')
const RepositorioUsuario = require('../../database/RepositorioUsuarios')
const controlador = new ControllerUsuario(new RepositorioUsuario());
const router = express.Router();

/** Consulta todos los usuarios */
router.get('/',async (req,res) =>{
    controlador.obtenerUsuario()
    .then((usuarios) => res.json(usuarios)) 
});

/** Consulta un usuario por id */
router.get('/:id',async (req,res) =>{
    console.log("Llega al router:", req.params)
    controlador.obtenerUsuarioPorId(req.params.id)
    .then((usuarios) => res.json(usuarios)) 
});

/** Guarda un usuario */
router.post('/',async (req,res) => {
    controlador.agregarUsuario(req.body.email, req.body.password)
    res.status(200)
    res.json({ message : "Add successfully."})
});

/** Actualiza un usuario */
router.put('/',async (req,res) => {
    controlador.actualizarUsuario(req.body)
    res.status(200)
    res.json({ message : "Update successfully."})
});

/** Elimina un usuario */
router.delete('/:id',async (req,res) => {
    controlador.eliminarUsuario(req.params.id)
    res.status(200)
    res.json({ message : "Deleted successfully."})
});

/** Logear usuario */
router.post('/login',async (req,res) => {
    console.log("Llega al router:", req.body)
    const result = await controlador.validarLoginUsuario(req.body.email, req.body.password)
    console.log("res" + result)
    if(result)
        res.status(200)
    else
        res.status(401)
    res.json({ message : "Login successfully."})
});

module.exports = router;