//streaming nodeJs file server, runs on localhost:3000
//require modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
//array of mime types
var mimeTypes = {
	'html':'text/html',
	'css':'text/css',
	'jpeg':'image/jpeg',
	'jpg':'image/jpeg',
	'png':'image/png',
	'js':'text/javascript'
};

http.createServer(function(req, res){
	var uri = url.parse(req.url).pathname;
	var fileName = path.join(process.cwd(), unescape(uri));
	console.log('loading'+uri);
	var stats;

	try{
		stats = fs.lstatSync(fileName);
	} catch(err) {
		res.writeHead(404, {'Content-type': 'text/plain'});
		res.write('404 Not Found\n');
		res.end();
		return;
	}
	//file or directory?
	if(stats.isFile()){
		var mimeType = mimeTypes[path.extname(fileName).split('.').reverse()[0]];
		//console.log('--'+mimeType);

		res.writeHead(200,{'Content-type':mimeType});
		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	}else if(stats.isDirectory()){
		res.writeHead(302, {
			'location':'index.html'
		});
		res.end();
	}else{
		res.writeHead(500, {'Content-type': 'text/plain'});
		res.write('500 Internal Error');
		res.end();
	}
}).listen(3000, function(){
	console.log('Server running at http://localhost:3000');
});