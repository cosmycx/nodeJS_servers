//basic nodeJs file server, serves from same folder, runs on localhost:9000
var http = require ('http'),
	fs = require('fs');
	path = require('path');
	host = '127.0.0.1',
	port = '9000';

var mimes = {
	'.html':'text/html',
	'.css':'text/css',
	'.js':'text/javascript',
	'.gif':'image/gif',
	'.jpg':'image/jpeg',
	'.png':'image/png'
}

var server = http.createServer( function(req, res){
	var filepath = (req.url == '/') ? ('./index.html'):('.'+req.url);
	var contentType = mimes[path.extname(filepath)];
	//file exists?
	fs.exists(filepath, function(file_exists){
		if(file_exists){
			//read and serve
			fs.readFile(filepath, function(error, content){
				if (error){
					res.writeHead(500);
					res.end();
				} else {
					res.writeHead(200, {'Content-Type': contentType})
					res.end(content,'utf-8');
				}
			});
		} else {
			res.writeHead(400);
			res.end("Sorry we could not find the requested file");
		}
	})

	res.writeHead(200, {'Content-Type' : 'text/html'});

}).listen(port, host, function(){
	console.log('Server Running on http://' + host +':' +port);
})



