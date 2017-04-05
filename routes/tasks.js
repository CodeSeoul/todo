const Repository = require('../src/repository')
const repo = new Repository()

function route (req, res) {
  switch (req.method) {
    case 'GET':
      routeGet(req, res)
      break
    case 'POST':
      routePost(req, res)
      break
    case 'PUT':
      routePut(req, res)
      break
    case 'DELETE':
      routeDelete(req, res)
      break
  }
}

function routeGet (req, res) {
  repo.findTasks(data => {
    res.end(JSON.stringify(data))
  })
}

function routePost (req, res) {
  req.on('data', (data) => {
    console.log(data)
    if (data.indexOf('changeStatus') > 1) {
      console.log('deleteAllData')
      repo.updateExistingTask(JSON.parse(data), _ => {
        res.end(JSON.stringify(data))
      })
    } else {
      console.log('data:', data)
      repo.addTask(JSON.parse(data), _ => {
        res.end(data)
      })
    }
  })
}

function routePut (req, res) {
  req.setEncoding('utf8')
  req.on('data', (data) => {
    console.log(data)
    repo.updateStartTime(JSON.parse(data), _ => {
      res.end(JSON.stringify(data))
    })
  })
}

function routeDelete (req, res) {
  req.setEncoding('utf8')
  req.on('data', (arr) => {
    if (arr.indexOf('ALL') > 1) {
      console.log('deleteAllData')
      repo.deleteAllTasks(_ => {
        res.end('{}')
      })
    } else {
      console.log('deleteData:', JSON.parse(arr))
      repo.deleteSelectedTasks(JSON.parse(arr), _ => {
        res.end('{}')
      })
    }
  })
}

exports.route = route
