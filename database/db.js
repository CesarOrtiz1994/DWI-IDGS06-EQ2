const Sequelize = require("sequelize")

const sequelize = new Sequelize("web_integral", "root", "[Z,{=8bA_q}3ZBds", {
  host: "localhost",
  dialect: "mysql",
})

const open = async () =>
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.")
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err)
    })
open()

module.exports = sequelize
