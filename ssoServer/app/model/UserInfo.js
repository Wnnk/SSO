'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const UserInfo = app.model.define('user_info', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    created_at: DATE,

  });

  UserInfo.associate = function() {
    app.model.UserInfo.hasOne(app.model.UserLogin, { as: 'login', sourceKey: 'id', foreignKey: 'user_id' });
  };



  return UserInfo;
};
