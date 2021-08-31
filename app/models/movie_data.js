const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


var MovieDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, default : "" },
    summary: { type: String, required : true }
   
});


module.exports = mongoose.model('Movie_data', MovieDataSchema);