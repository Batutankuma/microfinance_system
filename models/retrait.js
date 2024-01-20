const mongoose = require('mongoose');

const Schema = mongoose.Schema({
   motif:String
},{timestamps:true})

module.exports = mongoose.model('Retrait',Schema);