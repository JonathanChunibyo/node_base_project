'use strict';
// dbConnection
const db = require('../index');
const User = db.getModel('User');

// constants
const errors = require('../../errors/model.errors.json')

// libraries
const logger = require('../../config/logger');
const ErrorStackParser = require('error-stack-parser');

let instance = null;
class userQuery {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    async create(data, options) {
        try {
            await User.create(data, options);
        } catch (error) {
            const [stackTrace] = ErrorStackParser.parse(error);
            logger.error(JSON.stringify(stackTrace, null, 2));

            throw (errors.userErrors.queryErrors.create);
        }
    }
    async findAll(where) {
        try {
            return await User.findAll({
                where,
                raw: true,
                nest: true
            });
        } catch (error) {
            const [stackTrace] = ErrorStackParser.parse(error);
            logger.error(JSON.stringify(stackTrace, null, 2));

            throw (errors.userErrors.queryErrors.findAll);
        }
    }

    async findOne(where) {
        try {
            return await User.findOne({
                where,
                attributes: [
                    'id', 'nickName', 'name', 'lastName', 'password'
                ],
                raw: true,
                nest: true
            });
        } catch (error) {
            const [stackTrace] = ErrorStackParser.parse(error);
            logger.error(JSON.stringify(stackTrace, null, 2));

            throw (errors.userErrors.queryErrors.findOne);
        }
    }
}

module.exports = new userQuery();