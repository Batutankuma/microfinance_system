const Model = require('./../models/devise');
const { errorMessage, succesMessage } = require('../middlewares/message');

class Devise {
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

module.exports = Devise;