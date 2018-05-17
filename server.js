
var http = require('http');
var fileSystem = require('fs');

var server = http.createServer(function(req, resp){
	var pg = require('pg');
	var username = process.env.DB_USERNAME
	var password = process.env.DB_PASSWORD
	var host = process.env.DB_HOST
	var port = process.env.DB_PORT
	var databaseName = process.env.DB_NAME
	var conString = `postgres://${username}:${password}@${host}:${port}/${databaseName}`;

	try {
		var client = new pg.Client(conString);
		client.connect();
	} catch(err) {
		console.log(err);
	}

	fileSystem.readFile('./index.html', function(error, fileContent){
		if(error){
			resp.writeHead(500, {'Content-Type': 'text/plain'});
			resp.end('Error');
		}
		else{
			resp.writeHead(200, {'Content-Type': 'text/html'});
			fileContent = fileContent.toString().replace('#variable', process.env.TEST_VARIABLE)
			fileContent = fileContent.toString().replace('#connString', conString)
			resp.write(fileContent);
			resp.end();
		}
	});
});

server.listen(8080);
