// var express = require("express")
// var cors = require("cors")
// var app = express()

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   )
//   res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
//   res.setHeader("Access-Control-Allow-Credentials", true)
//   res.setHeader("Cache-Control", "no-cache")

//   next()
// })

// app.use(express.static("../front/build"))

// app.listen(81, console.log(`server is running at 81 port`))

const fs = require("fs")
const https = require("https")
const express = require("express")

const app = express()
app.use(express.static("../front/build"))

app.get("/", function (req, res) {
  return res.end("Serving static files!")
})

const key = fs.readFileSync(__dirname + "/ssl/privkey.pem")
const cert = fs.readFileSync(__dirname + "/ssl/fullchain.pem")

const options = {
  key: key,
  cert: cert,
}

const server = https.createServer(options, app)

server.listen(443, () => {
  console.log(`Serving on port 443`)
})
