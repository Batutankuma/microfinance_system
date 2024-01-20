const roleModel = require('./../models/operation');
const {errorMessage, succesMessage} = require('../middlewares/message');

class Operation{
    async add(req,res){
        try {
            const role = await roleModel(req.body);
            await role.save();
            succesMessage(res,role);
        } catch (error) {
            errorMessage(res,error);
        }
    }

    async read(req,res){
        try {
            const role = await roleModel.find().populate('personne').populate('compte').exec();
            succesMessage(res,role)
        } catch (error) {
            errorMessage(res,error);
        }
    }

    async readId(req,res){
        try {
            const role = await roleModel.findById({_id:req.params.id});
            succesMessage(res,role)
        } catch (error) {
            errorMessage(res,error);
        }
    }

    async update(req,res){
        try {
            const role = await roleModel.updateOne({_id:req.params.id},{...req.body});
            succesMessage(res,role)
        } catch (error) {
            errorMessage(res,error);
        }
    }

    async delete(req,res){
        try {
            const role = await roleModel.deleteOne({_id:req.params.id});
            succesMessage(res,role)
        } catch (error) {
            errorMessage(res,error);
        }
    }
}

module.exports = Operation;