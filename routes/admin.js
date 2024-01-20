const Controller = require('../controllers/admin');
const express = require('express');
const auth = require('./../middlewares/auth');
const router = express.Router();

const classes = new Controller();

router.post('/admin',classes.add);
router.get('/admin',classes.read);
router.get('/admin/:id',classes.readId);
router.put('/admin/:id',classes.update);
router.delete('/admin/:id',classes.delete);


module.exports = router;