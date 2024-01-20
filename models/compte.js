const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    montant:{type:Number, default:1000},
    devise:{type:mongoose.Types.ObjectId,ref:'Devise'},
    personne:{type:mongoose.Types.ObjectId,ref:'Personne'}
},{timestamps:true})

module.exports = mongoose.model('Compte',Schema);