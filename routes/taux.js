const Controller = require('../controllers/taux');
const express = require('express');
const router = express.Router();

const classes = new Controller();

router.post('/taux',classes.add);
router.get('/taux',classes.read);
router.get('/taux/:id',classes.readId);
router.put('/taux/:id',classes.update);
router.delete('/taux/:id',classes.delete);


module.exports = router;