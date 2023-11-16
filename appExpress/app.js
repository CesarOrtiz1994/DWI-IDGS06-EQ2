const express = require("express")
const path = require("path")
var bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'./views'))

const verificaToken = async (req, res, next) => {
    const authHeader = req.header('authorization')
    const token = authHeader && authHeader.split(" ")[1]
    console.log(token);
    if(!token) return res.status(401).json({ error: 'Acceso denegado'})
    try {
        const verified = jwt.verify(token, clave_secreta)
        verified
    } catch (e) {
        res.status(400).json({ error: "token no es valido"})
        
    }
    next()
};


const alumnos = require("./routes/api/alumnos");
const alumno = require("./routes/alumno");
const registro = require("./routes/api/registro")
const login = require("./routes/api/Login")

app.use('/api/alumno',verificaToken, alumnos)
app.use('/alumnos', verificaToken, alumno)
app.use('/api/registro', registro)
app.use('/api/login', login)
app.get('/', (req,res) => {
    res.render('index.ejs')
})

app.listen(3000,() => {
    console.log("Servicio inicio correctamente.")
})