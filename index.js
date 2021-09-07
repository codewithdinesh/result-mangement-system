var express = require('express')
var app = express()
var fs = require('fs')
var http = require('http').Server(app);


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
        <h1 class="text-center" style="color: rgb(255, 81, 0);">Check Exam Result</h1>
        </div>
        <div class="input_box my-2 mx-2">
            <div class="mb-3 row">
                
                <div class="col-md-10 my-1">
                <input type="text" class="form-control" id="search_term" placeholder="Enter Enrollment No.">
                </div>
                <button  class="col-md-2 col-form-label btn btn-primary my-1">Search</button>
            </div>
        </div>
    </div>`);

    response.write(` <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    </body>
    </html>`);

});


app.get('/marksheet', function (req, res) {
    fs.readFile(__dirname + "/" + "marksheet.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.get('/marksheet/:id', function (req, res) {
    function findId(data, fid) {

        var studentsArray = data.students;

        console.log('array length:'+studentsArray.length);

        console.log("id: "+ fid)

        for (var i = 0; i < studentsArray.length-1; i++) {

            if (studentsArray[i].id == fid) {

                return (studentsArray[i]);

                console.log(i);


            }

            // else {

            //     console.log(i)

            //     return ("Please Enter Valid Enrollment Number");

            // }

            console.log("loop checking: "+i)
        }
    }
    // First read existing users.
    fs.readFile(__dirname + "/" + "marksheet.json", 'utf8', function (err, data) {

        var marksheet = JSON.parse(data);

        var ffid = req.params.id;

        console.log("id:" + ffid)

        var user = findId(marksheet, ffid)

        console.log(user);

        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Marksheet</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
            <style>
            .btn:focus {
                outline: none;
              }
            </style>
        </head>
        <body>
        `);
        if(user==undefined){
            res.write(`<p class="text-center" >Enter valid user</p>`);
        }
        else{
        res.write(` 
            <div class="marksheet container">

            <div class="head">

                <h3 class="text-center text-uppercase top-header-statement">Statemant of marks</h3>

            </div>

            <hr/>

            <div class="details">`);
       
        var name=user.name;
        res.write(`
            <div class="name">
            ${name}
            </div>
            <div class="enroll">
            ${user.id}
            </div>
            <div class="seat">
            ${user.seat}
            </div>

            <div class="sem">
            ${user.sem}
            </div>
            <div class="course">
                
            </div>
        `);
        }

        res.write(`
            </div>
            </div>
        </body>
        </html>
        `)
        // res.end(JSON.stringify(user));

    });
});


