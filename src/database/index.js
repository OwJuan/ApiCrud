const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chefeUser:<ju32244000>@cluster0.tyh7o.mongodb.net/test', { useMongoClient:  true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
