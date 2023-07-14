'use strict';
// Libraries
const express = require('express');
const router = express.Router();
// import middleware
const authenticationMiddleware = require('../middleware/authenticationMiddleware.js')
// import controller
const authenticationController = require('../controllers/authenticationController.js');
// import validator
const authenticationValidator = require('../validator/authenticationValidator.js');

/* POST register user */
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

/* POST login user */
router.post('/login', async (req, res, next) => {
    try {
        const { error: errorBody } = authenticationMiddleware.schemaLogin.validate(req.body);
        if (errorBody) return res.sendError(errorBody.details[0].message);
        else {
            const [error] = await authenticationValidator.userExist(req.body, req);
            if (error) return res.sendError(error);
            next();
        }
    } catch (error) {
        return res.sendError(error);
    }
}, authenticationController.login)


module.exports = router;
