const express = require('express');
const app = express();
// const alumnosRoutes = require('./routes/Alumnos');
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

const alumnos = require('./routes/alumno');
const alumno = require('./routes/alumno');

app.use('/api/alumno', alumnos);
app.use('/alumnos', alumno);
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(3000, () => {
    console.log('Servidor iniciado en puerto 3000');
});

