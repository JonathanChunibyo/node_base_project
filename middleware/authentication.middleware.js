'use strict';
const Joi = require('joi');
const { userErrors } = require('../errors/model.errors.json');

let instance = null;
class authenticationMiddleware {
    constructor() {
        if (!instance) {
            this.nickName = Joi.string().min(8).max(30).required()
                .error(errors => this.errors(errors, 'nickName'));
            this.name = Joi.string().min(2).max(50).required()
                .error(errors => this.errors(errors, 'name'));
            this.lastName = Joi.string().min(2).max(50).required()
                .error(errors => this.errors(errors, 'lastName'));
            this.password = Joi.string().min(8).max(16).required()
                .error(errors => this.errors(errors, 'password'));
            this.schemaRegister = Joi.object({
                nickName: this.nickName,
                name: this.name,
                lastName: this.lastName,
                password: this.password,
            });
            this.schemaLogin = Joi.object({
                nickName: this.nickName,
                password: this.password,
            });
            instance = this;
        }
        return instance;
    }

    errors([err], attribute) {
        err.message = userErrors[attribute][err.code]
        return [err];
    }
}

module.exports = new authenticationMiddleware();
