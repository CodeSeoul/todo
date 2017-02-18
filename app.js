var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
  fs.readFile('static/index.html', function(err, data){
    if(err){
      console.log("couldn't read file");
    }else{
      res.end(data);
    }
  })
});

server.listen(3000, () => console.log('running on 3000'));
