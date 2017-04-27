const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const port = 3000
const UserRepository = require('./src/UserRepository')
const Repository = require('./src/Repository')
const repo = new Repository()
const userRepo = new UserRepository()

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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
  userRepo.findUsers(users => {
    console.log(users)
    res.render('admin', {users: users})
  })
})

app.get('/users/:id/del', (req, res) => {
  userRepo.deleteUser(req.params.id, _ => {
    res.redirect('/admin')
  })
})

app.get('/users/signup', (req, res) => {
  res.render('signup')
})

app.post('/users/signup', (req, res) => {
  userRepo.addUser(req.body, (id) => {
    res.redirect('/admin')
  })
})

app.get('/user/:id', (req, res) => {
  console.log('user id :', req.params.id)
  userRepo.findUser(req.params.id, (user) => {
    console.log(user)
    res.render('user', {user})
  })
})

app.listen(port, _ => {
  console.log('Server is running on port', port)
})
