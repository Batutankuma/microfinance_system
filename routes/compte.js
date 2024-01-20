const Controller = require('../controllers/compte');
const express = require('express');
const router = express.Router();

const classes = new Controller();

router.post('/compte',classes.add);
router.get('/compte',classes.read);
router.get('/compte/:id',classes.readId);
router.put('/compte/:id',classes.update);
router.delete('/compte/:id',classes.delete);


module.exports = router;