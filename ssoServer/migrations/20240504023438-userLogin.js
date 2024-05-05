'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('user_login', {
      uuid: { type: INTEGER, primaryKey: true,  autoIncrement: true  },
      user_id: INTEGER,
      password: STRING,
      salt: STRING,
      status: INTEGER(20),
      email: STRING(50),
      phone: STRING(20),
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('user_login');
  },
};