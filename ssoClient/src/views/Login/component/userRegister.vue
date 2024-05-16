<script setup lang="ts">
import {ref,reactive} from "vue"
import {validatePassword} from "@/utils/validate";
import {register, login} from '@/api/user'

const registerForm = ref({
  username: '',
  password: '',
  phone: '13797232936',
  code: '',
  isAgree: false
})
const userRegister  = async() => {
  if (!registerForm.value.isAgree) return;
  register(registerForm.value);
  registerForm.value = {
    username: '',
    password: '',
    phone: '13797232936',
    code: '',
    isAgree: false
  }
 
}
const getPhoneCode = () => {

}
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ]

});

</script>
<template>
  <div class="register-page">
    <el-form
      :rules="rules"
      :model="registerForm"
      style="max-width: 600px"
      label-width="auto"
      label-position="top"
      hide-required-asterisk="true"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="registerForm.code"></el-input>
        <el-button type="primary" @click="getPhoneCode" class="get-code-btn">获取验证码</el-button>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="registerForm.isAgree" >我已阅读并同意<a href="#">《用户协议》</a></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userRegister">注册</el-button>
      </el-form-item>

    </el-form>



  </div>
</template>
<style lang="scss" scoped>
.get-code-btn {
  margin-top: 10px;
}



</style>