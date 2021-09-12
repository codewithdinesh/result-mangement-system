var express = require('express')

var app = express()

var fs = require('fs')

var http = require('http').Server(app);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

//Adding favicon to Web app.

//set /favicon directory by public/images/favicon.ico and then us in html head file by /favicon href
app.use('/favicon', express.static('public/images/favicon.ico'));




var data = require('./data/marksheet.json');
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
        <link rel="shortcut icon" href="/favicon" type="image/x-icon">
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
        
    <div class="align-items-center h-100">
        <div class="header col-md-12">
        
        <h1 class="text-center" style="color: rgb(255, 81, 0);">Check Exam Result </h1>
        </div>
        <div class="input_box my-2 mx-2 col-md-12">
             <form action="/marksheet" method="GET">
                <div class="mb-3 row align-items-center h-100">
                
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


    //array to store json data
    var studentsArray = {};

    //seting the data to array
    for (i in data) {

        if (data.hasOwnProperty(i) && data[i] != "0") {
            studentsArray[i] = data[i];

        }

    }
    console.log(studentsArray)

    //find out students marksheet by its id so i used my own function to find out user by its id
    var student = findId(studentsArray, search_term);

    //setting html 




    if (student === undefined) {

        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="shortcut icon" href="/favicon" type="image/x-icon">
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
        if (search_term != undefined) {
            if (search_term.length < 10) {
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
            } else {
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




        }



    }
    else {

        //html head 
        res.write(`
        <!DOCTYPE html>
        <html>
        
        <head>
            <title> </title>
        
            <style>
                body {
                    font-family: Calibri;
                    margin: 10px;
                }
        
                .statment {
                    font-family: Calibri;
                    text-align: center;
                    margin-top: 20px;
                    text-transform: uppercase;
                }
                .column-1{
                    height:30px;
                    padding-left:15px
                }
        
        
                .tbl tr td {
                    padding: 2px 5px;
                }
        
        
                * {
                    margin: 0px;
                    padding: 0px;
        
                }
        
                .main {
                    width: 1050px;
                    height: auto;
                    border: 3px dotted black;
                    margin: auto;
                    padding: 10px;
                }
        
        
                .heading {
                    width: 100%;
                    height: 100px;
                }
        
        
                .heading h1,
                h3 {
        
                    font-family: 'Old English Text MT';
                    text-align: center
                }
        
        
                .img {
                    width: 10%;
                    height: 100px;
                    float: left;
                    margin-left: 15px;
                }
        
                .td {
        
                    height: 15px;
                    width: 205px;
                    text-align: center;
                }
        
                .td1 {
                    /*border: 1px solid;*/
                    height: 15px;
                    width: 80px;
                    text-align: center;
        
        
                }
        
                table,
                th,
                td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
        
                .col {
                    border: 0px;
                    border-bottom: 1px dashed;
                    border-collapse: collapse;
                    height: 40px;
                }
            </style>
        
        </head>
             `);





        //Setup Marksheet Page

        res.write(`<body>

        <div class="main">
            <img class="img" src="https://msbte.org.in/MSBTE_Logo/logo.png" border="0" alt="MSBTE LOGO" />
    
            <div class="heading">
                <h1 style="font-size:41px;">Maharashtra State Board of Technical Education</h1>
                <h3 class="statment">Statement of Marks</h3>
            </div>
    
            <div>`)

        res.write(` 
        <table style="width:100%;margin-top:10px;border:0px solid">
                <tr>
                    <td style="width:155px;" class="col">&nbsp;&nbsp;&nbsp;<strong>MR. / MS.</strong></td>
                    <td colspan="6" class="col"><strong>${student.name}</strong></td>
                </tr>

                <tr>
                    <td style="width:155px;" class="col">&nbsp;&nbsp;&nbsp;<strong>ENROLLMENT NO.</strong></td>
                    <td style="width:170px;" class="col">${student.id}</td>
                    <td style="width:150px;" class="col"><strong>EXAMINATION</strong></td>
                    <td style="width:150px;" class="col">${student.exam}</td>
                    <td style="width:100px;" class="col"><strong>SEAT NO.</strong></td>
                    <td style="width:100px;" class="col">${student.seat}</td>
                    <td style="width:100px;" class="col"><strong> ${student.sem}</strong></td>
                </tr>

                <tr>
                    <td style="margin-right:20px;width:155px;" class="col">&nbsp;&nbsp;&nbsp;<strong>COURSE</strong>
                    </td>
                    <td colspan="6" class="col">${student.course}</td>
                </tr>
        </table>
    `);

        //console


        res.write(`  <div id="dvMain0">
            <table border='1' cellspacing='0' align='center' widht='0'>
                <tr>
                    <td width='700px' height='30px' align='center' rowspan='2'><strong>TITLE OF COURSES</strong>
                    </td>

                    </td>
                    <td width='350px' height='30px' align='center' colspan='5'><strong>MARKS</strong></td>
                    <!-- <td width='150px' height='30px align='center' colspan='2'><strong></strong></td> -->

                </tr>
                <tr>
                    <td width='150px' height='30px' align='center'><strong>MAX.</strong></td>

                    <td width='150px' height='30px' align='center'><strong>OBT</strong></td>
                </tr>
                `);


        //set total marks =0
        var totalmarks = 0;

        //length of subjects
        var nosub = student.subject.length;

        //users total obtained marks
        var usermarks = 0;

        //Printing marks and Subject ,calculating totalmarks
        for (var i = 0; i < student.subject.length; i++) {

            //calculating max. total marks
            totalmarks += student.subject[i].maxmarks;

            //calculating user obtained total marks
            usermarks += student.subject[i].marks;

            res.write(`<tr>
                    <td  class="column-1">
                    ${student.subject[i].name}
                    </td>
                    <td class="column-1">
                    ${student.subject[i].maxmarks}
                    </td>
                    <td class="column-1">
                    ${student.subject[i].marks}
                    </td>
                      
                    </tr>`)

        }

        res.write(`

            </table>
        </div>`)






        //Ending Html in marksheet search page
        res.write(`
        <div id="dvTotal0">
                <table class='tbl' border='1' cellspacing='0' align='center' widht='0'>
                    <tr>
                        <td width='150px' height='60px' align='left' rowspan='3'><strong>DATE :</strong><br />
                            ${student.date} </td>
                        <td width='600px' height='30px' align='center' rowspan='3'>This Marksheet is Downloaded from
                            Internet<br /></br><span style='font-weight:bold;'> SECRETARY </span><br />MAHARASHTRA STATE
                            BOARD OF TECHNICAL EDUCATION</td>
                        <td width='150px' height='30px' align='center'><strong>TOTAL MAX.<br /> MARKS</strong></td>
                        <td width='150px' height='30px' align='center'><strong>RESULT WITH<br />%</strong></td>
                        <td width='150px' height='30px' align='center'><strong>TOTAL MARKS<br /> OBTAINED </strong></td>

                    </tr>`
        );


        var percentage = usermarks / totalmarks * 100;
        var percentage1 = percentage.toFixed(2);

        var dist;
        if (percentage1 >= 75) {
            dist = "First class Dist."
        } else if (percentage1 >= 60 && percentage1 < 75) {
            dist = "Second class"
        } else if (percentage1 >= 50 && percentage1 < 60) {
            dist = "Third Class"
        }
        else if (percentage1 >= 35 && percentage1 < 50) {
            dist = "pass"
        }
        else {
            dist = "fail"
        }

        res.write(`
                    <tr>
                    <td width='150px' height='30px' align='center'><strong>${totalmarks}</strong></td>
                    <td width='150px' height='30px' align='center'><strong>${percentage1}</strong></td>
                    <td width='150px' height='30px' align='center'><strong>${usermarks}</strong></td>
                    
                    <tr>
                        
                        <td width='150px' height='30px' align='center' colspan='4'><strong>${dist}</strong>
                        </td>
                    </tr>
                </table>
            </div>

            <div>
`);
        res.write(` <p style="page-break-after: always;">&nbsp;</p>
        <!--<p style="page-break-before: always;">&nbsp;</p>-->

        <br />
        <br>
</body>

</html>`);

        //Ending else part of Marksheet id is blank or not
    }


    //END of /marksheet search page
    return res.end();
})



//API
app.get('/api', function (req, res) {
    fs.readFile(__dirname + "/data/" + "marksheet.json", 'utf8', function (err, data) {
        
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="shortcut icon" href="/favicon" type="image/x-icon">
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
        <div class="container my-4">
        <div class="alert alert-danger" role="alert">
        Page Not Found
        </div>

        <div class="row">
            <div class="col-12">
            
                <a href="/">
                    <button class="btn btn-success text-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                        Go Back
                    </button>
                </a>
            </div>
        </div>               
        </div>
        </body>
        </html>`) 
    });
})


var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("server starting at ", port)
})

function findId(data, fid) {

    var studentsArray = data.students;


    var i = 0;
    // console.log("length:" + studentsArray.length)
    while (i < studentsArray.length) {

        // console.log("loop checking: " + i)


        if (studentsArray[i].id == fid) {

            return (studentsArray[i]);

        }
        i++;





    }
}
