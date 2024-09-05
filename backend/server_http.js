const express = require("express")
require("dotenv").config()
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const Item = require("./models/Item.js")

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: true,
  })
)

app.get("/", function (req, res) {
  res.writeHead(200)
  res.end("hello world")
})

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
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
    res.status(500).json({ error: error.message })
  }
})

app.post("/checkitem", async (req, res) => {
  const { code } = req.body

  if (typeof code !== "undefined") {
    try {
      const founditem = await Item.findOne({
        code: code,
      })
      res.json(founditem)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(400).json({ error: "Invalid code" })
  }
})

app.post("/deleteitem", async (req, res) => {
  const { code } = req.body
  try {
    await Item.deleteOne({ code: code })
    const items = await Item.find()
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put("/updateitem", async (req, res) => {
  const { code, name } = req.body

  try {
    const updatedItem = await Item.findOneAndUpdate(
      { code: code },
      { title: name }
    )

    if (!updatedItem) {
      return res.status(404).send("Item not found")
    }

    res.status(200).send("ok")
  } catch (error) {
    console.error("Error updating item:", error)
    res.status(500).send("Internal Server Error")
  }
})

// Запуск сервера на порту 90
app.listen(90, () => {
  console.log("Server is running at port 90")
})
