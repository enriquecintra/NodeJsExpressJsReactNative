const express = require('express');
const middlewareValidateJWT = require('../services/token.service')
const router = express.Router();
const controller = require('../controllers/auth.controller')
router.post('/', controller.post);
router.post('/sso', middlewareValidateJWT, controller.postSSO);
module.exports = router;