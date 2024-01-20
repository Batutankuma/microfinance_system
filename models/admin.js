const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    nom:{type:String,default:'Administrateur'},
    personne: [{type:mongoose.Schema.Types.ObjectId, ref:'Personne'}]
},{timestamps:true});

module.exports = mongoose.model('Admininstrateur',Schema);