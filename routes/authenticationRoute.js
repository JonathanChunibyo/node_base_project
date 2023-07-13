'use strict';
// Libraries
var express = require('express');
var router = express.Router();
// import middleware
var authenticationMiddleware = require('../middleware/authenticationMiddleware.js')
// import controller
var authenticationController = require('../controllers/authentication.controller.js');
// import validator
var authenticationValidator = require('../validator/authenticationValidator.js');

/* POST home page. */
router.post('/register', async (req, res, next) => {
    try {
        const { error: errorBody } = authenticationMiddleware.schemaRegister.validate(req.body);
        if (errorBody) return res.sendError(errorBody.details[0].message);
        else {
            const [error] = await authenticationValidator.userAlreadyExist({ nickName: req.body.nickName });
            if (error) return res.sendError(error);
            next();
        }
    } catch (error) {
        return res.sendError(error);
    }
}, authenticationController.register);

module.exports = router;
