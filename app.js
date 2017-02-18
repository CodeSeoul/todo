var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
  if (req.url === '/') {
    serverIndex(res);
  } else if (req.url === '/favicon.ico') {
    serveFavicon(res);
  } else if (req.url === '/js/script.js') {
    serveJavascript(res);
  }else {
    pageNotFound(res);
  }
});

server.listen(3000, () => console.log('running on 3000'));

function serverIndex(res) {
  fs.readFile('static/index.html', (err, data) => {
    if(err){
      console.log("couldn't read file");
    }else{
      res.end(data);
    }
  });
}

function serveFavicon(res) {
  fs.readFile('static/favicon.ico', (err, data) => {
    if(err){
      console.log("couldn't read file");
    }else{
      res.end(data);
    }
  });
}

function serveJavascript(res) {
  fs.readFile('static/js/script.js', (err, data) => {
    if(err){
      console.log("couldn't read file");
    }else{
      res.end(data);
    }
  });
}

function pageNotFound(res) {
  res.statusCode = 404;
  res.end('Page not found');
}
