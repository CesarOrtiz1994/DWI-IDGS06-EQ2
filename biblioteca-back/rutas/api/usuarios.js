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
    console.log("actualizar")
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
    // if(result)
    //     res.status(200)
    // else
    //     res.status(401)
    // res.json({ message : "Login successfully."})
});

router.post("/", async (req, res) => {
    res.status(200);
  
    if (!await controlador.validarLoginUsuario(req.body.email, req.body.password))
    {
      return res.status(400).json({error: "Usuario o pasword incorrecto"})
    }
  
    const token = jwt.sign(
      {
        user: req.body.username,
      },
      clave_secreta,
      {
        expiresIn: "1h",
      }
    );
  
    console.log(token);
    res.header("auth-token", token).json({
      data: { token },
    });
  });
  
  router.post('/verificaToken', async (req, res) => {
      const authHeader = req.header('authorization')
      const token = authHeader && authHeader.split(" ")[1]
      console.log(token);
      if(!token) return res.status(401).json({ error: 'Acceso denegado'})
      try {
          const verified = jwt.verify(token, clave_secreta)
          verified
          res.status(200).json({ data: verified })
      } catch (e) {
          res.status(400).json({ error: "token no es valido"})
      }
  })

module.exports = router;