const express = require('express');
const middlewareValidateJWT = require('../services/token.service')
const router = express.Router();
const controller = require('../controllers/user.controller')
const controllerInvite = require('../controllers/invite.controller')

router.get('/:id', middlewareValidateJWT, controller.get);
router.post('/', middlewareValidateJWT, controller.post);
router.put('/:id', middlewareValidateJWT, controller.put);


//Invites
router.get('/:userId/invite/:id', middlewareValidateJWT, controllerInvite.get);
router.get('/:userId/invite', middlewareValidateJWT, controllerInvite.list);
router.post('/:userId/invite', middlewareValidateJWT, controllerInvite.post);
router.put('/:userId/invite/:id', middlewareValidateJWT, controllerInvite.put);


module.exports = router;