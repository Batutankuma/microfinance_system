const roleController = require('../controllers/envoi');
const express = require('express');
const router = express.Router();

const role = new roleController();

router.post('/envoi',role.add);
router.get('/envoi',role.read);
router.get('/envoi/:id',role.readId);
router.put('/envoi/:id',role.update);
router.delete('/envoi/:id',role.delete);


module.exports = router;