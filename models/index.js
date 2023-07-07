'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

class db {
  constructor() {
    this.sequelize = config.use_env_variable ?
      new Sequelize(process.env[config.use_env_variable], config) :
      new Sequelize(config.database, config.username, config.password, config);

    this.models = {};
    this.initModels();
    this.associateModels();
  }

  authenticate() {
    return this.sequelize.authenticate();
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  initModels() {
      fs.readdirSync(__dirname)
      .filter(file => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js' &&
          file.indexOf('.test.js') === -1
        );
      })
      .forEach(file => {
        const model = require(path.join(__dirname, file))(this.sequelize, Sequelize.DataTypes);
        this.models[model.name] = model;
      });
    }

  associateModels() {
    Object.values(this.models).forEach(model => {
      if (model.associate) {
        model.associate(this.models);
      }
    });
  }

  getModel(name) {
    return this.models[name];
  }
}

const Database = new db()
module.exports = Database;