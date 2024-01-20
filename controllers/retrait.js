const Model = require('./../models/envoi');
const ModelOperation = require('./../models/operation');
const { errorMessage, succesMessage } = require('../middlewares/message');

class Retrait {
    async add(req, res) {
        try {
            const model = await Model({
                motif:req.body.motif,
            });
            const operation = await ModelOperation({
                montant:req.body.montant,
                taux:req.body.taux,
                personne:req.body.personne,
                compte:req.body.compte
            });
            await model.save();
            await operation.save();
            succesMessage(res, model);
        } catch (error) {
            errorMessage(res, error);
        }
    }

    async read(req, res) {
        try {
            const model = await Model.find().exec();
            succesMessage(res, model)
        } catch (error) {
            errorMessage(res, error);
        }
    }

    async readId(req, res) {
        try {
            const model = await Model.findById({ _id: req.params.id });
            succesMessage(res, model)
        } catch (error) {
            errorMessage(res, error);
        }
    }

    async update(req, res) {
        try {
            const model = await Model.updateOne({ _id: req.params.id }, { ...req.body });
            succesMessage(res, model)
        } catch (error) {
            errorMessage(res, error);
        }
    }

    async delete(req, res) {
        try {
            const model = await Model.deleteOne({ _id: req.params.id });
            succesMessage(res, model)
        } catch (error) {
            errorMessage(res, error);
        }
    }
}

module.exports = Retrait;