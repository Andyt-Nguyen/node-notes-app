var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//connect to database
mongoose.connect(//use mongoDB database to store your data);


//create schema - This is like a blueprint
var notesSchema = new mongoose.Schema({
	item: String
});

var Notes = mongoose.model('Notes', notesSchema);

//var data = [{item: "Get Milk"}, {item: "Walk Dog"}, {item: "Code"}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

	app.get('/todo', function(req, res){
		//get data from mongoDB and pass it to the view
		Notes.find({},function(err, data){
			if(err) throw err;
			res.render('todo', {todos:data});
		});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		//get data from the view and add it to mongoDB
		var newNotes = Notes(req.body).save(function(err, data){
			if(err) throw err;
			res.json(data);
		});
	});

	app.delete('/todo/:item', function(req, res){
		//Delete Requested Items from mongoDB
		Notes.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err,data){
			if(err) throw err;
			res.json(data);
		});
	});
}
