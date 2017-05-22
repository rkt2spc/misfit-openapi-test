var utils = require('util');
var uuid = require('uuid');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:28000/test-db', () => {
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var Schema = mongoose.Schema;
var ThingSchema = new Schema({
  prop: Schema.Types.ObjectId,
});
var Thing = mongoose.model('Thing', ThingSchema);

var thing = new Thing({
  prop: mongoose.Types.ObjectId(),//uuid.v4().replace(/-+/g, '')),
  hehe: 'abcdef'
});

thing.save((err) => {
  if (err) console.log(err);
  console.log(typeof thing.prop.toString());
});

var x = thing.prop.toString();
console.log(typeof thing.prop.toString());

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
});
