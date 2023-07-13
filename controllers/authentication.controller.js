'use strict';
// Query
var userQuery = require('../models/query/user.query');

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
            await userQuery.createUser(req.body);
            return res.sendSuccess(null);
        } catch (error) {
            return res.sendError(error);
        }
    }
}
module.exports = new authenticationController();
        