const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const Repository = require('./src/Repository')
const repo = new Repository()

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/tasks', (req, res) => {
  repo.findTasks(tasks => {
    res.send(JSON.stringify(tasks))
  })
})

app.delete('/tasks', (req, res) => {
  repo.deleteTask(req.body[0], ()=> {
    res.send({});
  })
})

app.put('/tasks/:id', (req, res) => {
  repo.modifyTask(req.params.id, req.body, ()=> {
    res.send({});
  })
})

app.listen(port, _ => {
  console.log('Server is running on port', port)
})
