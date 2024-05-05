const validatePassword = (rule, value, callback) => {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (value === '') {
        callback(new Error('密码不能为空'));
    } else if(!reg.test(value)) {
        callback(new Error('密码必须包含大小写字母和数字，且长度不能少于8位'));
    } else {
        callback();
    }
};


export { validatePassword };