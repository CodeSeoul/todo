const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
const port = 3000

const Repository = require('./src/Repository')
const repo = new Repository()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(logger('dev'))

app.get('/tasks', (req, res) => {
  repo.findTasks(tasks => {
    res.send(JSON.stringify(tasks))
  })
})

app.delete('/tasks', (req, res) => {
  let arr = req.body
//  console.log(arr.indexOf('ALL'))
  if (arr.indexOf('ALL') === 0) {
    console.log('deleteAllData')
    repo.deleteAllTasks(_ => {
      res.end('{}')
    })
  } else {
    console.log('deleteData:', arr)
    repo.deleteSelectedTasks(arr, _ => {
      res.end('{}')
    })
  }
})

app.put('/tasks/:id', (req, res) => {
  repo.modifyTask(req.params.id, req.body, () => {
    res.send({})
  })
})

app.post('/tasks', (req, res) => {
  repo.addTask(req.body, (id) => {
    res.send(id)
  })
})

app.listen(port, _ => {
  console.log('Server is running on port', port)
})
