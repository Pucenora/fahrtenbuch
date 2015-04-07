'use strict';

var express = require('express');
var controller = require('./trip.controller');

var router = express.Router();

router.get('/trip', controller.index);
router.get('/trip/:id', controller.show);
router.post('/trip', controller.create);
router.put('/trip/:id', controller.update);
router.patch('/trip/:id', controller.update);
router.delete('/trip/:id', controller.destroy);

module.exports = router;