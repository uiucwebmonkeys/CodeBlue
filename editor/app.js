var http = require('http');
var fs = require('fs');
var path = require('path');
 
var server = http.createServer(function (request, response) {
 
    console.log('request starting...');
     
    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }
    
    console.log(filePath);
         
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
     
     
            fs.readFile(filePath, function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                
            });
            
    }).listen(3000, "127.0.0.1");
 
console.log('Server running at http://127.0.0.1:3000/');

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.on('code', function (data) {
    socket.broadcast.emit('push code', data);
  });
});