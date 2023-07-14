'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const salt = bcrypt.genSaltSync(10);
    return queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      nickName: 'JonathanRubio',
      name: 'Jonathan',
      lastName: 'Rubio',
      password: bcrypt.hashSync('password123', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nickName: 'JhoanCardozo',
      name: 'Jhoan',
      lastName: 'Cardozo',
      password: bcrypt.hashSync('password321', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
