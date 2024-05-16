/* 防刷中间件 */
const ipMap = new Map();
const bannedIps = new Set();
module.exports = () => {
  return async function ipLogger(ctx, next) {
    const clientIP = ctx.ip;
    /* 判断是否在黑名单中 */
    if (bannedIps.has(clientIP)) {
      ctx.status = 403;
      ctx.body = {
        code: 403,
        message: '请求被禁止',
      };
      return;
    }

    const current = new Date().getTime();
    /* 判断同一IP是否在限制时间内，多次请求 */
    if (ipMap.has(clientIP)) {
      const info = ipMap.get(clientIP);
      if (info.exptime > current && info.count < 5) {
        info.count++;
        await next();
        return;
      } else if (info.exptime > current && info.count >= 5) {

        ctx.status = 403;
        ctx.body = {
          code: 403,
          message: '请求过于频繁',
        };
        return;
      }
    }
    /* 记录ip信息 */
    const exptime = current + 5 * 60 * 1000;
    const ipInfo = {
      exptime,
      count: 1,
    };
    ipMap.set(clientIP, ipInfo);
    console.log(ipMap);

    await next();
  };
};
