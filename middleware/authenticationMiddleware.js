'use strict';
const Joi = require('joi');
const { userErrors } = require('../errors/errors.model.json');

let instance = null;
class authenticationMiddleware {
    constructor() {
        if (!instance) {
            this.schemaRegister = Joi.object({
                nickName: Joi.string().min(8).max(30).required()
                    .error(errors => {
                        errors.forEach(err => (err.message = userErrors.nickName[err.code]));
                        return errors;
                    }),
                name: Joi.string().min(2).max(50).required()
                    .error(errors => {
                        errors.forEach(err => (err.message = userErrors.name[err.code]));
                        return errors;
                    }),
                lastName: Joi.string().min(2).max(50).required()
                    .error(errors => {
                        errors.forEach(err => (err.message = userErrors.lastName[err.code]));
                        return errors;
                    }),
                password: Joi.string().min(8).max(16).required()
                    .error(errors => {
                        errors.forEach(err => (err.message = userErrors.password[err.code]));
                        return errors;
                    }),
            });
            instance = this;
        }
        return instance;
    }
}

module.exports = new authenticationMiddleware();
