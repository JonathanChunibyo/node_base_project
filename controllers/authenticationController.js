'use strict';
// Query
const userQuery = require('../models/query/user.query');
// Libraries
const jwt = require('jsonwebtoken');

let instance = null;
class authenticationController {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    async register(req, res) {
        try {
            await userQuery.create(req.body);
            return res.sendSuccess(null);
        } catch (error) {
            return res.sendError(error);
        }
    }

    async login(req, res) {
        try {
            const { user } = req.validationData;
            const token = await new Promise((res, rej) =>
                jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, (error, token) =>
                    error ? rej(error) : res(token)
                ));
            return res.sendSuccess({ token, user });
        } catch (error) {
            return res.sendError(error);
        }
    }
}
module.exports = new authenticationController();
