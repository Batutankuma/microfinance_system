const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    nom:String,
    prenom:String,
    sexe:String,
    phone:{type:String,unique:true},
    password:String,
    email:{type:String,unique:true}
},{timestamps:true})

module.exports = mongoose.model('Personne',Schema);