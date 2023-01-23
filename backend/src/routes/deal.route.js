const express = require('express');
const middlewareValidateJWT = require('../services/token.service')
const router = express.Router();
const controller = require('../controllers/deal.controller')


router.post('/', middlewareValidateJWT, controller.post);
router.post('/search', controller.search);


router.get('/:id', controller.get);

router.put('/:id', middlewareValidateJWT, controller.put);
module.exports = router;

