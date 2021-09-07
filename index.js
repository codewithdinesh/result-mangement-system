var express = require('express')
var app = express()
var fs = require('fs')
var http = require('http').Server(app);

// var http=require('http')
// server = require('http').createServer(app)
// // io = io.listen(server);

http.listen(process.env.PORT || 3000, function () {
    console.log('listening on', http.address().port);
})

app.get('/', function (req, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <title>Check Exam Result </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    </head>
    <body>`);
    response.write(` <div class="container">
    <div class="header">

    </div>
    <div class="input_box my-2 mx-2">
        <div class="mb-3 row">
            
            <div class="col-md-10 my-1">
              <input type="text" class="form-control" id="search_term">
            </div>
            <button  class="col-md-2 col-form-label btn btn-primary my-1">Search</button>
          </div>
    </div>
</div>`);
    response.write(` <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
</body>
</html>`);

});

app.get('/users', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.get('/users/:id', function (req, res) {

    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var user = users["user" + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user));

    });
});


