
var http = require('http');
var fileSystem = require('fs');

var server = http.createServer(function(req, resp){
	fileSystem.readFile('./index.html', function(error, fileContent){
		if(error){
			resp.writeHead(500, {'Content-Type': 'text/plain'});
			resp.end('Error');
		}
		else{
			resp.writeHead(200, {'Content-Type': 'text/html'});
			fileContent = fileContent.toString().replace('#variable', process.env.TEST_VARIABLE)
			resp.write(fileContent);
			resp.end();
		}
	});
});

server.listen(8080);
