const express = require('express')
const app = express()
const port = 3000

const Repository = require('./src/Repository')
const repo = new Repository()

app.use(express.static('public'))

app.get('/tasks', (req, res) => {
  repo.findTasks(tasks => {
    res.send(JSON.stringify(tasks))
  })
})

app.listen(port, _ => {
  console.log('Server is running on port', port)
})
