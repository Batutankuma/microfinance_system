const Controller = require('../controllers/devise');
const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

const classes = new Controller();

router.post('/devise',classes.add);
router.get('/devise',classes.read);
router.get('/devise/:id',classes.readId);
router.put('/devise/:id',classes.update);
router.delete('/devise/:id',classes.delete);


module.exports = router;