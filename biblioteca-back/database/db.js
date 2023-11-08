const { Sequelize } = require("sequelize");

//conectar a la BD
const sequelize = new Sequelize('bibliouteq', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
})

const open = async () => {
    await sequelize.authenticate().then(
      console.log("Conectado a la BD MySQL local.")
      ).catch((error) => {
      console.log("Error de conexión:", error)
    })
  }

  open();

module.exports = sequelize;