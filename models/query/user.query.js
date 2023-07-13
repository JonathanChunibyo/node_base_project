'use strict';
// dbConnection
const db = require('../index');
const User = db.getModel('User');

// constants
const errors = require('../../errors/errors.model.json')

// libraries
var logger = require('../../config/logger');
const ErrorStackParser = require('error-stack-parser');

let instance = null;
class userQuery {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    async createUser(data, options) {
        try {
            await User.create(data, options);
        } catch (error) {
            const [ stackTrace ] = ErrorStackParser.parse(error);
            logger.error(JSON.stringify(stackTrace, null, 2));

            throw (errors.userErrors.queryErrors.create);
        }
    }
    async findAllUser(where) {
        try {
            return await User.findAll({
                where,
                raw: true,
                nest: true
            });
        } catch (error) {
            const [ stackTrace ] = ErrorStackParser.parse(error);
            logger.error(JSON.stringify(stackTrace, null, 2));

            throw (errors.userErrors.queryErrors.findAll);
        }
    }
}

module.exports = new userQuery();