const roleController = require('../controllers/operation');
const express = require('express');
const router = express.Router();

const role = new roleController();

router.post('/operation',role.add);
router.get('/operation',role.read);
router.get('/operation/:id',role.readId);
router.put('/operation/:id',role.update);
router.delete('/operation/:id',role.delete);


module.exports = router;