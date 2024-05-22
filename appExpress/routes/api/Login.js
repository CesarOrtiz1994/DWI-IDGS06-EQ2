const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const clave_secreta = "calve_s3creta";
const ControllerUsuario = require("../../controller/Usuario")
const RepositorioUsusario = require("../../database/RepositorioUser")
const controlador = new ControllerUsuario(new RepositorioUsusario());


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
