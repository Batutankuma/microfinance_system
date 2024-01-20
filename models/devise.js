const mongoose = require('mongoose');

const Schema = mongoose.Schema({
   code:String,
   description:String
},{timestamps:true})

module.exports = mongoose.model('Devise',Schema);