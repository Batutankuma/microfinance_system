const Model = require('./../models/compte');
const { errorMessage, succesMessage } = require('../middlewares/message');

class Compte {
    async add(req, res) {
        try {
            const model = await Model(req.body);
            await model.save();
            succesMessage(res, model);
        } catch (error) {
            errorMessage(res, error);
        }
    }

    async read(req, res) {
        try {
            const model = await Model.find().
                populate({ path: 'personne'}).
                populate({ path: 'devise'})
                .exec();
            succesMessage(res, model)
        } catch (error) {
            errorMessage(res, error);
        }
    }

    async readId(req, res) {
        try {
            const model = await Model.findById({ _id: req.params.id }).
            populate({ path: 'personne'}).
            populate({ path: 'devise'})
            .exec();
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

module.exports = Compte;