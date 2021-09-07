var express=require('express')
var app = express()
var fs=require('fs')

var http=require('http')
server = require('http').createServer(app)
// // io = io.listen(server);

app.get('/', function(req, res) {
    res.send('MArksheet ApI');
    req.at
});

app.get('/users',function(req,res){
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
     });
})

app.get('/users/:id', function (req, res) {

    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
});

server.listen(3009,function(){
    var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});
