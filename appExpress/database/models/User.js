const sequelize = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
     password: {
        type: DataTypes.STRING,
     },
});

User.sync({ force: false })
module.exports = User;