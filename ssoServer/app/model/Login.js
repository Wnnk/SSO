'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Login = app.model.define('login', {
    uuid: { type: INTEGER(20), primaryKey: true },
    user_number: STRING,
    password: STRING,
    salt: STRING,
    status: INTEGER(20),
  });

  return Login;
};
