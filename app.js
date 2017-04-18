const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cons = require('consolidate')
const path = require('path')
const port = 3000

const Repository = require('./src/Repository')
const repo = new Repository()

const app = express()

app.engine('html', cons.mustache)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
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

app.get('/admin', (req, res) => {
  let fakeUsers = [
    {name: 'Dale Seo'},
    {name: 'Benjamin Sadick'},
    {name: 'Nate Lipp'}
  ]
  res.render('admin', {users: fakeUsers})
})

app.listen(port, _ => {
  console.log('Server is running on port', port)
})
