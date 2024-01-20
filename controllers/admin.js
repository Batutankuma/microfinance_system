const userModel = require('../models/admin');
const personneModel = require('../models/personne');
const {errorMessage, succesMessage} = require('../middlewares/message');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Admin{
    async singIn(req,res){
        try {
            const personne = await personneModel(req.body);
            const model = await userModel({
                nom: 'abonne',
                personne:personne._id
            });
            await model.save();
            await personne.save();
            succesMessage(res, model);
        } catch (error) {
            errorMessage(res, error);
        }
    }
    async login(req,res){
        console.log(req.body);
        try {
            const user = await userModel.findOne({matricule: req.body.matricule});
            if(!user){
                return errorMessage(res,"l'utilisateur n'existe pas");
            }else{
                bcrypt.compare(req.body.password,user.password)
                .then((response)=>{
                    const token = process.env.token_secret;
                    succesMessage(res,jwt.sign({user: user},token,{expiresIn: "24h"}))
                }).catch((error)=>{
                    errorMessage(res,"mot de passe incorrect:" + error);
                })
            } 
        } catch (error) {
            
        }
    }
    async add(req,res){
        try {
            const user = await new userModel(req.body);
            await user.save();
            succesMessage(res,user);
        } catch (error) {
            errorMessage(res,error);
        }
    }

    async read(req,res){
        try {
            const user = await userModel.find().populate('personne').exec();
            succesMessage(res,user)
        } catch (error) {
            errorMessage(res,error);
        }
    }

    async readId(req,res){
        try {
            const user = await userModel.findById({_id:req.params.id}).populate('personne').exec();
            succesMessage(res,user)
        } catch (error) {
            errorMessage(res,error);
        }
    }

    async update(req,res){
        try {
            const user = await userModel.updateOne({_id:req.params.id},{...req.body});
            succesMessage(res,user)
        } catch (error) {
            errorMessage(res,error);
        }
    }

    async delete(req,res){
        try {
            const user = await userModel.deleteOne({_id:req.params.id});
            succesMessage(res,user)
        } catch (error) {
            errorMessage(res,error);
        }
    }
}

module.exports = Admin;