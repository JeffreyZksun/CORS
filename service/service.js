var express=require('express');
var http = require('http');

// Use this flag to enable/disable the CORS
var enableCORS = true;

//Middleware: Allows cross-domain requests (CORS)
var allowCrossDomain = function(req, res, next) {
	if(enableCORS){
    	if (req.method.toUpperCase() === "OPTIONS"){
 
      	// When dealing with CORS (Cross-Origin Resource Sharing)
        // requests, the client should pass-through its origin (the
        // requesting domain). We should either echo that or use *
        // if the origin was not passed.
        var origin = (req.headers.origin || "*");
        
        console.log('method:' + req.method);
        console.log('origin:' + origin);
 
        // Echo back the Origin (calling domain) so that the
        // client is granted access to make subsequent requests
        // to the API.
        res.writeHead(
            "204",
            "No Content",
            {
    	       "access-control-allow-origin": origin,
            	"access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                "access-control-allow-headers": "content-type, accept",
                "access-control-max-age": 10, // Seconds.
                "content-length": 0
            }
        );
 
        // End the response - we're not sending back any content.
        return( res.end() ); 
        }
	}

    next();
}


var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use(app.router);

app.all('*', function(req, res, next){

    var origin = (req.headers.origin || "*");
        
    console.log('method:' + req.method);
    console.log('origin:' + origin);
     
    // Create a response body to echo back the incoming
    // request.
    var responseBody = (
        "Thank You For The Cross-Domain AJAX Request:\n\n" +
        "Method: " + req.method + "\n\n" 
    );
 
    // Send the headers back. Notice that even though we
    // had our OPTIONS request at the top, we still need
    // echo back the ORIGIN in order for the request to
    // be processed on the client.
    var headers = {
        "content-type": "text/plain",
        "content-length": responseBody.length
    };
	if(enableCORS){
        headers["access-control-allow-origin"] = "*";
    }
                
    res.writeHead(
        "200",
        "OK",
        headers
    );
                
    // Close out the response.
	return( res.end( responseBody ) );
});

http.createServer(app).listen(8080);
console.log("web service is listening on 8080 with CORS " + (enableCORS ? "enabled" : "disabled"));