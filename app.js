var http = require('http');
var fs = require('fs');

//TODO I think we should add a switch statement, starting to get long

var server = http.createServer((req, res) => {
  if (req.url === '/') {
    serveStatic('/index.html', res);
  } else {
    serveStatic(req.url, res);
  }
});

server.listen(3000, () => console.log('running on 3000'));

function serveStatic(path, res) {
  fs.readFile('static' + path, (err, data) => {
    if (err) pageNotFound(res);
    res.end(data);
  });
}

function pageNotFound(res) {
  console.console.log("couldn't find CSS");
  res.statusCode = 404;
  res.end('Page not found');
}
