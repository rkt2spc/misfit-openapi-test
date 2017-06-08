
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/default-db', () => {
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var Schema = mongoose.Schema;
var DumpSchema = new Schema({
  a: String,
  clone_a: String,
});
DumpSchema.index({clone_a: 1}, {unique: true, partialFilterExpression: { a: { $exists: true } }})



var Dump = mongoose.model('Dump', DumpSchema);
Dump.on('index', (err) => {
  if (!err) return;
  console.log('>>>>>>>>>>>>>>> Index Error >>>>>>>>>>>>>>>>>');
  console.log(err);
});

Dump.find({}, (err, records) => {
  if (err) {
    console.log(err);
    return;
  }

  records.forEach((rec) => {
    rec.clone_a = rec.a;
    rec.save((e) => {
      if (e) console.log('DUPLICATED:', rec._id);
      else console.log('Success:', rec._id);
    });
  })
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
});
