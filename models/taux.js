const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    devise_a: {type:mongoose.Types.ObjectId,ref:'Devise'},
    devise_b: {type:mongoose.Types.ObjectId,ref:'Devise'},
    taux_montant: Number
},{timestamps:true})

module.exports = mongoose.model('Taux',Schema);