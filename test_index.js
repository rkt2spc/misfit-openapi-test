
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/default-db', () => {
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var Schema = mongoose.Schema;
var DumpSchema = new Schema({
  prop: String,
});

// DumpSchema.index({a: 1}, { unique: true, sparse: true });
var Dump = mongoose.model('Dump', DumpSchema);

Dump.on('index', (err) => {
  console.log('>>>>>>>>>>>>>>> Index Error >>>>>>>>>>>>>>>>>');
  console.log(err);
});

var dump = new Dump({a: 1});
dump.save((err) => {
  if (err) console.log(err);
  else console.log('HEHE');
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
});
