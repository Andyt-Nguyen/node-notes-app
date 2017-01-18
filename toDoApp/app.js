var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//set up template engine
app.set('view engine', 'ejs');

//set up static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(6777, '127.0.0.1');
console.log("The server is now running...");
