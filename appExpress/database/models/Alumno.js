const sequelize = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

const Alumno = sequelize.define('Alumno', {
    alumno_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
     nombre: {
        type: DataTypes.STRING,
     },
     email: {
        type: DataTypes.STRING,
     }
});
Alumno.sync({ force: false })
module.exports = Alumno;