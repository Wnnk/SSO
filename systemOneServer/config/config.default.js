/* eslint valid-jsdoc: "off" */

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
  config.keys = appInfo.name + '_1714197989763_4031';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.cluster = {
    listen: {
      port: 3001,
    },
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
