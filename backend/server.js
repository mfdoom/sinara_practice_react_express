const express = require("express")
require("dotenv").config()
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI)

const Item = require("./models/Item.js")

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: true,
  })
)

//https staff

var fs = require("fs")
var https = require("https")

https
  .createServer(
    {
      key: fs.readFileSync("./ssl/privkey.pem"),
      cert: fs.readFileSync("./ssl/fullchain.pem"),
    },
    app
  )
  .listen(90, () => {
    console.log("serever is runing at port 90")
  })

//https staff end

app.get("/", function (req, res) {
  res.writeHead(200)
  res.end("hello world")
})

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (error) {
    throw error
  }
})

app.post("/additem", async (req, res) => {
  const { code, title } = req.body
  try {
    const newitem = await Item.create({
      code,
      title,
    })
    res.json(newitem)
  } catch (error) {
    console.log(error)
  }
})

app.post("/checkitem", async (req, res) => {
  const { code } = req.body

  if (typeof code !== "Не найден") {
    try {
      const founditem = await Item.findOne({
        code: code,
      })

      res.json(founditem)
    } catch (error) {}
  }
})

app.post("/deleteitem", async (req, res) => {
  const { code } = req.body
  try {
    await Item.deleteOne({ code: code })
  } catch (error) {
    console.log(error)
  }
})
