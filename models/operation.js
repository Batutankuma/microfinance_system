const mongoose = require('mongoose');

const Schema = mongoose.Schema({
   montant:Number,
   taux:{type:mongoose.Types.ObjectId,ref:"Taux",required:false},
   personne:{type:mongoose.Types.ObjectId,ref:"Personne"},
   compte:{type:mongoose.Types.ObjectId,ref:"Compte"}
},{timestamps:true})

module.exports = mongoose.model('Operation',Schema);