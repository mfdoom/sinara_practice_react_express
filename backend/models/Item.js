const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  time: { type: Date, default: Date.now },
})

const ItemModel = mongoose.model("Item", itemSchema)

module.exports = ItemModel
