var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movie_data' ,{ useNewUrlParser: true, useUnifiedTopology: true });
var db1 = mongoose.connection;
db1.on('error', console.error.bind(console, 'connection error:'));
db1.once('open', function () {
    // we're connected!
    console.log("mongo connected!!");
});

require('mongoose').set('debug', true)

module.exports = db1;