'use strict';
// Libraries
const express = require('express');
const router = express.Router();
// import middleware
const middleware = require('../middleware/authentication.middleware.js')
// import controller
const controller = require('../controllers/authentication.controller.js');
// import validator
const validator = require('../validator/authentication.validator.js');

/* POST register user */
router.post('/register', async (req, res, next) => {
    try {
        const { error: errorBody } = middleware.schemaRegister.validate(req.body);
        if (errorBody) return res.sendError(errorBody.details[0].message);
        else {
            const [error] = await validator.userAlreadyExist({ nickName: req.body.nickName });
            if (error) return res.sendError(error);
            next();
        }
    } catch (error) {
        return res.sendError(error);
    }
}, controller.register);

/* POST login user */
router.post('/login', async (req, res, next) => {
    try {
        const { error: errorBody } = middleware.schemaLogin.validate(req.body);
        if (errorBody) return res.sendError(errorBody.details[0].message);
        else {
            const [error] = await validator.userExist(req.body, req);
            if (error) return res.sendError(error);
            next();
        }
    } catch (error) {
        return res.sendError(error);
    }
}, controller.login);


module.exports = router;
