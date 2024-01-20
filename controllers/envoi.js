const Model = require('./../models/envoi');
const Personne = require('./../models/personne');
const Compte = require('./../models/compte');
const ModelOperation = require('./../models/operation');
const { errorMessage, succesMessage } = require('../middlewares/message');
const accountSid = 'ACe61a8c118c345f76781b5f84ee60f7d4';
const authToken = '6551748412d972932c08a895c745e748';
const client = require('twilio')(accountSid, authToken);


class Envoi {
    async add(req, res) {
        try {
            const expediteur = await Personne.findById({ _id: req.body.personne });
            const destinateur = await Personne.findOne({ _id: req.body.destinateur }).populate('personne').exec();
            verificationMontant(expediteur, destinateur, parseFloat(req.body.montant), req.body.motif, res);
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



/**
 * Traitement Montant
 * Verification montant envoyer est Sup montant Existant dans le compte de l'expediteur 
 */
async function verificationMontant(expediteur, destinateur, montentEnvoyer, motif, res) {
    //Nous recupérons un compte par rapport à son compte 
    const compteExpediteur = await Compte.findOne({ "personne": expediteur._id }).populate('personne').exec();
    const montantExistant = parseFloat(compteExpediteur.montant);
    if (montantExistant >= montentEnvoyer) {
        verificationDevise(expediteur, destinateur, montentEnvoyer, motif, res);
    } else {
        console.log("Vous n'avez pas un montant suffisant pour effectuer cette opération verifiez votre compte");
    }
}

/**
 * Verification de devise
 * Nous verifions le devise de l'expediteur si est egal au devise de recepteur
 * @param idExpetideur
 * @param idDestinateur
 */
async function verificationDevise(expediteur, destinateur, montantEnvoyer, motif, res) {
    try {
        const compteExpediteur = await Compte.findOne({ "personne": expediteur._id }).populate('personne').populate("devise").exec();
        const compteDestinateur = await Compte.findOne({ "personne": destinateur._id }).populate('personne').populate("devise").exec();
        if (compteDestinateur.devise.code != compteExpediteur.devise.code) {
            console.log('je veux appliquer taux');
        } else {
            var resultatExpediteur = montantEnvoyer - parseFloat(compteExpediteur.montant);
            resultatExpediteur = Math.abs(resultatExpediteur)
            var resultatDestinateur = montantEnvoyer + parseFloat(compteDestinateur.montant);
            const updateExpediteur = await Compte.updateOne({ "personne": expediteur._id }, { "montant": resultatExpediteur }).exec();
            const updateDestinateur = await Compte.updateOne({ "personne": destinateur._id }, { "montant": resultatDestinateur }).exec();
            const model = await Model({
                motif: motif,
                destinateur: destinateur._id
            });
            const operation = await ModelOperation({
                montant: montantEnvoyer,
                personne: expediteur._id,
                compte: compteExpediteur._id
            });
            await model.save();
            await operation.save();
            const number = compteDestinateur.personne.phone;
            const numberDestinateur = number.replace(0, '');
            var message = "Hello, " + compteDestinateur.personne.nom + "  vous avez reçu " + montantEnvoyer + " " + compteDestinateur.devise.code.toUpperCase();
            sendSMS(numberDestinateur, message, res);
        }
    } catch (error) {
        errorMessage(res, error);
    }
}

function sendSMS(numero, message, res) {
    const telephone = "+243" + numero;
    client.messages
        .create({
            to: telephone,
            body: message,
            from: '+15342203492',
        })
        .then(message => succesMessage(res, "operation effectuer"))
        .done();
}

module.exports = Envoi;