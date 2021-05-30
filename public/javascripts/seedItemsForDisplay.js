
// UPDATE
// update price and popularity for all existing contracts

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("steamtest");

        

});

