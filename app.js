var http = require('http')
var fs = require('fs')
var Repository = require('./src/repository')

// TODO I think we should add a switch statement, starting to get long
let repo = new Repository()

var server = http.createServer((req, res) => {
  if (req.url === '/') {
    serveStatic('/index.html', res)
  } else if (req.method === 'GET' && req.url === '/tasks') {
    repo.findTasks((data) => {
      res.end(data)
    })
  } else if (req.method === 'POST' && req.url === '/tasks') {
    req.setEncoding('utf8')
    req.on('data', (data) => {
      repo.addTask(data)
      res.end(data)
    })
  } else if (req.method === 'DELETE' && req.url === '/tasks') {
    repo.deleteTask()
    res.end('DELETE /tasks')
  } else {
    serveStatic(req.url, res)
  }
})

server.listen(3000, () => console.log('running on 3000'))

function serveStatic (path, res) {
  fs.readFile('static' + path, (err, data) => {
    if (err) pageNotFound(res)
    res.end(data)
  })
}

function pageNotFound (res) {
  console.log("couldn't find CSS")
  res.statusCode = 404
  res.end('Page not found')
}
