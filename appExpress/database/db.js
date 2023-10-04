const Sequelize = require('sequelize');

const sequelize = new Sequelize('DWI', 'root', 'C3S4r94', {
    host: 'localhost',
    dialect: 'mysql'
});

const open = async () => await sequelize.authenticate();
open();

module.exports = sequelize;