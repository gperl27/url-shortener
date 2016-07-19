//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
require('dotenv').config({
    silent: true
});

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = process.env.MONGOLAB_URI;      
//(Focus on This Variable)

// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to database');

    // do some work here with the database.
    var collection = db.collection('urls');
    
    var url1 = { test: 'test' };
    
    collection.insert(url1, function(err, result){
        if (err) {
            console.log(err);
        } else {
            console.log('Inserted docs into the "urls" collection. The docs inserted are: ', result)
        }
    })
    //Close connection
    db.close();
  }
});