'use strict';
var userQuery = require("../models/query/user.query");
var errors = require('../errors/errors.authentication.json')

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
            const [ user ] = await userQuery.findAllUser(where);
            if(user) error.push(errors.userAlreadyExist);
            return error;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new authenticationValidator;
