var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  //Valid id using isValid
    //404 - send back empty send
    if(!ObjectID.isValid(id)){
      res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
      if(!todo){
        res.status(404).send()
      }

      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
  //get the id

  //Validate the id -> Not valid? return 404

  //Remove by id
    //succes
      //if no doc, send 404
      //if doc, send doc back with 200
    //error
      //400 with an empty body



});

app.listen(port, () => {
  console.log(`Starter up at port ${port}`);
});

module.exports = {app};
