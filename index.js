var express = require('express');
var app = express();


var insertRouter = require('./router/insert-router');
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }));

app.use('/', insertRouter);


app.listen(8080)