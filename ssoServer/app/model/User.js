'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    created_at: DATE,
    email: STRING(50),
    phone: STRING(20),
  });

  User.associate = function() {
    app.model.User.hasOne(app.model.Login, { as: 'login', sourceKey: 'id', foreignKey: 'user_number' });
  };


  return User;
};

