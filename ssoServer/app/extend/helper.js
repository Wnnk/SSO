const bcrypt = require('bcryptjs'); // 引入bcryptjs,加盐使用
const JSEncrypt = require('node-jsencrypt'); // 引入jsencrypt, 解密使用

module.exports = {
    isEmail(email) {
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return reg.test(email);
    },
    
    isPhone(phone) {
        const reg = /^1[34578]\d{9}$/;
        return reg.test(phone);
    },

    isPassword(password) {
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return reg.test(password);
    },

    addSalt: function(data) {
        const salt = bcrypt.genSaltSync(10); // 生成salt
        const hash = bcrypt.hashSync(data, salt); // 加密
        return {salt, hash};
    },

    compareSaltData: function(data, hash) {
        return bcrypt.compareSync(data, hash); // 验证数据
    },


  

    decryptData: function(data) {
        const {app} = this;
        let jsencrypt = new JSEncrypt();
        jsencrypt.setPrivateKey(app.config.private_key);
        return JSON.parse(jsencrypt.decrypt(data));
    },   
}