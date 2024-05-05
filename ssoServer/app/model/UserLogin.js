'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const UserLogin = app.model.define('user_login', {
    uuid: { type: INTEGER, primaryKey: true, autoIncrement: true  },
    user_id: INTEGER,
    password: STRING,
    salt: STRING,
    status: INTEGER(20),
    email: STRING(50),
    phone: STRING(20),
  });

  UserLogin.associate = function() {
    app.model.UserLogin.belongsTo(app.model.UserInfo, { as: 'user', foreignKey: 'user_id' });
  };



  return UserLogin;
};
