var express = require('express')

var app = express()

var fs = require('fs')

var http = require('http').Server(app);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


var data = require('./marksheet.json');



//Homepage Router 
app.get('/', function (req, response) {

    response.writeHead(200, { 'Content-Type': 'text/html' });

    //Head of Html document
    response.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <title>Check Exam Result </title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <style>
        .btn{
            background-color:#294a70;
            color:white;
        }
        .btn:hover{
            background-color:#11498a;
            color:white;

        }
        </style>
       
    </head>
    <body>`);

    response.write(` <div class="container">
        <div class="header">
        <h1 class="text-center" style="color: rgb(255, 81, 0);">Check Exam Result</h1>
        </div>
        <div class="input_box my-2 mx-2">
             <form action="/marksheet" method="GET">
                <div class="mb-3 row">
                
                    <div class="col-md-10 my-1">
                        <input type="text" maxlength="10" name="search_id" class="form-control shadow-none" id="search_term" placeholder="Enter Enrollment No." required>
                    </div>
                            <button  class="btn btn-md btn-default col-md-2  col-form-label  my-1 shadow-none" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-center" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                            Search</button>
                </div>
            </form>
        </div>
    </div>`);

    response.write(` <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>

  
    </body>
    </html>`);


    return response.end();



});


//Routing /marksheet page
app.get('/marksheet', function (req, res) {

    //Getting search term from Query
    var search_term = req.query.search_id;

    //checking search term is correct or wrong 
    console.log("search_term :" + search_term);





    //CHECK if user nothing enter in inout box and click on submit button then current page redirect to current/home page
    if (search_term == '') {

        //redirect
        res.statusCode = 302;
        res.redirect('/');
    
   
        return;

    } else {

        //array to store json data
        var studentsArray = {};

        //seting the data to array
        for (i in data) {

            if (data.hasOwnProperty(i) && data[i] != "0") {
                studentsArray[i] = data[i];

            }

        }

        //find out students marksheet by its id so i used my own function to find out user by its id
        var student = findId(studentsArray, search_term);

        //setting html 
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
             .btn:focus,.btn:active ,input:focus ,input:active {
                 outline: none !important;
                 box-shadow: none;
              }
             </style>
         </head>
         <body>
         `);

         if(search_term.length<10){
            res.write(`
            <div class="container my-4">
            <div class="alert alert-danger" role="alert">
            Please Enter 10 Digit Enrollment number
            </div>

            <div class="row">
                <div class="col-12">
                
                    <a href="/">
                        <button class="btn btn-success text-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                            </svg>
                            Go Back to Search Page
                        </button>
                    </a>
                </div>
            </div>               
            </div>`)


        } else if (student === undefined) {
           

            res.write(`
                <div class="container my-4">
                <div class="alert alert-danger" role="alert">
                Please Enter Correct Enrollment Number !
                </div>

                <div class="row">
                    <div class="col-12">
                    
                        <a href="/">
                            <button class="btn btn-success text-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                </svg>
                                Go Back to Search Page
                            </button>
                        </a>
                    </div>
                </div>               
                </div>`)
            


        }
        else {


            



            //Setup Marksheet Page



            res.write(` 
        <div class="marksheet container">

        <div class="head">

            <h4 class="text-center text-uppercase top-header-statement">Statemant of marks</h4>

        </div>

        <hr/>

        <div class="details">`);

            res.write(`
        <div class="name">
        ${student.name}
        </div>
        <div class="enroll">
        ${student.id}
        </div>
        <div class="seat">
        ${student.seat}
        </div>

        <div class="sem">
        ${student.sem}
        </div>
        <div class="course">
        ${student.marks}
        </div>
    `);
        
        }




        //Ending Html in marksheet search page
        res.write(`
        </div>
        </div>
    </body>
    </html>
`)

        //Ending else part of Marksheet id is blank or not
    }


    //END of /marksheet search page
    return res.end();
})



// marksheet page
app.get('/marksheet', function (req, res) {
    fs.readFile(__dirname + "/" + "marksheet.json", 'utf8', function (err, data) {
        // console.log(data);


        res.end(data);
    });
})



app.get('/marksheet/:id', function (req, res) {

    // First read existing users.
    fs.readFile(__dirname + "/" + "marksheet.json", 'utf8', function (err, data) {

        var marksheet = JSON.parse(data);

        //get id from url box by params
        var uid = req.params.id;

        console.log("id:" + uid)

        var user = findId(marksheet, uid)


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
            .btn:focus,.btn:active ,input:focus ,input:active {
                outline: none !important;
                box-shadow: none;
             }
            </style>
        </head>
        <body>
        `);

        res.write(` 
            <div class="marksheet container">

            <div class="head">

                <h4 class="text-center text-uppercase top-header-statement">Statemant of marks</h4>

            </div>

            <hr/>

            <div class="details">`);

        var name = user.name;
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
            ${user.marks.java}
            </div>
        `);


        res.write(`
            </div>
            </div>
        </body>
        </html>
        `)


    });
});
const port=3000;
app.listen(port, function () {
    console.log("server starting at 3000")
})

function findId(data, fid) {

    var studentsArray = data.students;


    var i = 0;
    console.log("length:" + studentsArray.length)
    while (i < studentsArray.length - 1) {

        // console.log("loop checking: " + i)


        if (studentsArray[i].id == fid) {

            return (studentsArray[i]);

        }
        i++;





    }
}
