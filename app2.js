// backup for non-express app

const http = require('http')
const fs = require('fs')

const tasks = require('./routes/tasks')

const server = http.createServer((req, res) => {
  req.setEncoding('utf8')

  if (req.url === '/') {
    serveStatic('/index.html', res)
  } else if (/\/tasks\/?(.*)/.test(req.url)) {
    tasks.route(req, res)
  } else {
    serveStatic(req.url, res)
  }
})

server.listen(3000, () => console.log('running on 3000'))

function serveStatic (path, res) {
  fs.readFile('public' + path, (err, data) => {
    if (err) pageNotFound(res)
    res.end(data)
  })
}

function pageNotFound (res) {
  console.log("couldn't find CSS")
  res.statusCode = 404
  res.end('Page not found')
}
