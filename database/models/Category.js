const sequelize = require("../db")
const { DataTypes } = require("sequelize")

const Category = sequelize.define("Category", {
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
})

// sequelize.sync().then(() => {
//   console.log("Categories table created")
// })

module.exports = Category
