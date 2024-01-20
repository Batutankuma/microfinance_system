const mongoose = require('mongoose');

const Schema = mongoose.Schema({
   motif:String,
   destinateur:{type:mongoose.Types.ObjectId,ref:"Personne"},
},{timestamps:true})

module.exports = mongoose.model('Envoi',Schema);