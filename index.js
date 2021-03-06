// Import express
var express = require('express');
var app = express();

// Get MongoClient
var MongoClient = require('mongodb').MongoClient;

// db url, collection name and db name
const dburl = 'mongodb://localhost:27017';
const dbname = 'mydb';
const collname = 'customers';

// process root url '/'
app.get('/', function(req, res) {

  // connect to DB
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection(collname);

      // Find all documents in the collection
      collection.find({}).toArray(function(err, todos) {
        if (!err) {

          // write HTML output
          var output = '<html><header><title>List from DB</title></header><body>';
          output += '<h1>List retrieved from DB</h1>';
          output += '<table border="1"><tr><td><b>' + 'name' + '</b></td><td><b>' + 'img' + '</b></td><td><b>' + 'summary' + '</b></td></tr>';

          // process todo list
          todos.forEach(function(todo){
            output += '<tr><td>' + todo.name + '</td><td><img src=' + todo.img + ' width="100" height="100"></td><td>' + todo.summary + '</td></tr>';
          });

          // write HTML output (ending)
          output += '</table></body></html>'

          // send output back
          res.send(output);

          // log data to the console as well
          console.log(todos);
        }
      });

      // close db client
      client.close();
    }
  });
});

// listen on port 3000
app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});