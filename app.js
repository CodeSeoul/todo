const express = require('express')
const app = express()
const path = require('path')
const tasks = require('./routes/tasks')
const port = 3000

app.use(express.static('public'))

app.listen(port, _ => {
  console.log("Server is running on port", port)
})
