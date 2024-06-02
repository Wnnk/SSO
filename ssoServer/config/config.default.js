/* eslint valid-jsdoc: "off" */
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1714053858684_7567';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '1275056222',
      database: 'sso',
    },
    app: true,
    agent: false,
  };

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://127.0.0.1' ],
  };
  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.jwt = {
    secret: '123456',
  };
  config.sequelize = {
    // 数据库类型
    dialect: 'mysql',
    // host
    host: 'localhost',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: '1275056222',
    // 数据库名
    database: 'sso',
    // 时区，sequelize有很多自动时间的方法，都是和时区相关的，记得设置成东8区（+08:00）
    timezone: '+08:00',
    define: {
      timestamps: false, // timestamps默认值是true，如实是true会自动添加上 create_time 和update_time两个字段
      freezeTableName: true, // freezeTableName默认值是 false 如果是false的话，会自动在表名后加s复数
    },
  };
  config.cluster = {
    listen: {
      port: 5001,
    },
  };

  config.multipart = {
    // mode: 'file',
    whitelist: [ '.bin', '.txt', '.png', '.jpg', '.jpeg', '.gif','.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx','.mp3','.mp4' ],
  };
  config.static = {
    prefix: '/temp/',
    dir: path.join(appInfo.baseDir, 'app/temp'),
    // dirs: [ dir1, dir2 ] or [ dir1, { prefix: '/static2', dir: dir2 } ],
    // support lazy load
    // dynamic: true,
    // preload: false,
    // buffer: false,
    // maxFiles: 1000,
  };

  // 私钥
  config.private_key = `-----BEGIN PRIVATE KEY-----
  MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJtq2Z+1SfJktY
  8fNWzXLvwkLv7vuz3zqCwXxt4DxJcxmnGA0NpEK3DY0+6StDgNl6nqYPouhzMLLl
  36/8A0Vv/5snD2EBJKH/iQeVKebpbTSVQMToKjFM5Ztf561/wIQPIldYe/a3BjWW
  hyGqNmPX2pHwd+HZewh117Do/8K5AC8vJsR3XL6JMZMuGEv1CDTcfSncl00sIZ4C
  tTa5RzoKhsUZr9FGC54f5Uy2azA2w5tJiPhGXwT6iv3XiLQ/th5wlvjJp09yXkat
  R0kHLOdTTk74oCbHwEyk/hLGcaMFM35zYGlZycyGP3Pc2f/h1QZpJ4TDQlofQLdQ
  oJ8g9EOFAgMBAAECggEAQpIslx4QXnnn8hHf6mzhmuk06DSqE0H/8Hlk1Gpl2yPG
  epQActkcP4eUbwfLBHs4yzQiwBRWvPV8hUserIBz4TOtg+WacSMi58/UldD/aVhm
  Oz/l/G04WhWJAszWQMxLiScfRo+a6+p7sxMj9CYBK5LyCTe3bOwi7alitHL8U8t6
  r/yrCw1oADmHIof10o9o8ubEtjLSD1mYfStkZsXOP9uqMvi0utAR9cuBco8p+hoj
  hDCmA2IGhVYbAO7FPfwmDKUCUgXoQgb3lHQm0iA9etzuFJ34e0OIBonhJTBrAb1a
  2kq8nLOuqm6h0Q6/aIlXX6v9fJNvJZ6cv0n7JAzhPQKBgQDrhDf5IwyW3ZoDZ/UX
  77MrKyjnBTQxF0rJVEcTFWmM0TbrMCmFd/8g2GKaDxsVM4OZ3wF3kgyJi8NeoXyJ
  moF/dyf9JAc3usNJo/2SXz9Y2ROzg1uYCIDrQr7+rCSPVL5plfohp8+ovVpvqB1s
  bzkcjASzeimXAhv4vmhGqzUSpwKBgQDbQdZLICKG1fVhisFf8yM22uN4DmT3Alf5
  kKP5aE4PEFxKRnk4ja/sSlh86uOWSvyFelcXXSxuQUlpOhMNlEB36AKjE/41eT00
  dYfukNXUgnY/1FVpLUxWXRlQT7vY6//yIWbok4UK0kPg80n2fNaY59rmfSb39fUf
  vt5aBZzZ8wKBgQDm7H6BbsdSSbhQbKcZsDLKOghh9G1HUSJII7WI1a7nnt+tXUzp
  DE6A4wpTKkqQ0DDSN6HVnsNiPkLyz34v4enllG0GPURCdYIz+3KPCYswT7CMjFjL
  ylK12n0xcpJqY1pMZvyZ8VOgjQFWh81J3AhwoC2f2UFcSnoovHG8EPT58wKBgQCl
  nVpfzrslvDGoZyXf8wjTY41UXxMWnVeUdBPXzVjA+iusEwV3mVacFiA24znbiXKq
  5Bkq1b883OW1rR89L5FuwPpU8kIfZB++I1T098P8zDrDxgBp/MRfq9z2E/QhS0o+
  O8q+vMdOwDpzjXF91RhH0UJAvaIUxF1OiF7uArVSzwKBgBTFG0O4zQKrrvxWmKza
  TLm3zS4V0ekR/u6GsZDCvmCMU/TKVwwH9GgXs8CimY4kwlFQ+OjIh4vteoUJDXsO
  PxX4U1jXBVaNQVomrfaS2iGrvQ84pdVCveXAnq+AVqiFhw4nn38RseTWyYwJ/nCf
  fJKFLMLKPTOmtIr9kf8yN/AH
  -----END PRIVATE KEY-----`;


  return {
    ...config,
    ...userConfig,
  };
};
