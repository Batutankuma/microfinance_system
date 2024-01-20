const Controller = require('../controllers/retrait');
const express = require('express');
const router = express.Router();

const classes = new Controller();

router.post('/retrait',classes.add);
router.get('/retrait',classes.read);
router.get('/retrait/:id',classes.readId);
router.put('/retrait/:id',classes.update);
router.delete('/retrait/:id',classes.delete);


module.exports = router;