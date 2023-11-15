const express = require("express")
const bodyParser = require("body-parser")
const categoriesRouter = require("./routes/api/categories")
const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use("/api/categories", categoriesRouter)

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
