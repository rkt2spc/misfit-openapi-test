// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect('mongodb://localhost:27017/test-db', function(err, db) {
//   if (err) return console.log(err);  
//   console.log("Connected successfully to server");

//   var collection = db.collection('stuff');
//   collection.insert({
//     strink: Buffer.from([0, 0, 0, 1]).toString('ascii')
//   }, function(err, result) {
//     if (err) return console.log(err);
//     console.log(result);
//     db.close();  
//   });
// });

const sizeof = require('object-sizeof');
console.log(sizeof(Buffer.from([1,2,3,4]).toString()));