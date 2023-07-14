'use strict';
const userQuery = require("../models/query/user.query");
const errors = require('../errors/authentication.errors.json')
// libraries
const logger = require('../config/logger');
const ErrorStackParser = require('error-stack-parser');
const bcrypt = require('bcryptjs');

let instance = null;
class authenticationValidator {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    async userAlreadyExist(where) {
        try {
            let error = [];
            const user = await userQuery.findOne(where);
            if (user) error.push(errors.userAlreadyExist);
            return error;
        } catch (error) {
            const [stackTrace] = ErrorStackParser.parse(error);
            logger.error(JSON.stringify(stackTrace, null, 2));

            throw error;
        }
    }

    async userExist({ nickName, password: passwordValidate }, req) {
        try {
            let error = [];
            req.validationData = {};
            const { password, ...user } = await userQuery.findOne({ nickName });
            if (!user) error.push(errors.userDoesNotExist);
            else if (bcrypt.compareSync(passwordValidate, password)) req.validationData.user = user;
            else error.push(errors.userIncorrectPassword);
            return error;
        } catch (error) {
            const [stackTrace] = ErrorStackParser.parse(error);
            logger.error(JSON.stringify(stackTrace, null, 2));

            throw error;
        }
    }
}
module.exports = new authenticationValidator;
