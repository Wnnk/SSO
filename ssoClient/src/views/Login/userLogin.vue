<script setup>
import axios from 'axios'
import loginTabs from '@/views/Login/component/loginTabs.vue';
import { onMounted,ref } from 'vue';
const originUrl = ref('')
onMounted(() => {
  let url = document.location.href.split('=');
  const origin = url[url.length - 1].split('.')[0]
  originUrl.value = origin;
})

const test = async() => {
  const data  = {
    username: 'admin',
    password: '123456'
  }
  const str = cryptor.encrypt(JSON.stringify(data));
  const result = await axios({
    method: 'post',
    url: 'http://127.0.0.1:5001/login',
    data:{rsaParams:str},
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (result.data.code === '0') {
    const token = result.data.data.token;
    console.log(originUrl.value)
    if (originUrl.value !== '') {
      rediectoriginUrl(token);
    }
    
  }

  
}
/** 
 * @description: 携带token重定向到源网址
 * 
**/
const rediectoriginUrl = (token) => {
  console.log(originUrl.value, token)
  window.location.href = `${originUrl.value}?token=${token}`;

}
</script>

<template>
  <div class="login-page">
    <h1 class="login-title">SSO认证系统</h1>
    <el-row class="login-container">
      <el-col :span="4" class="login-logo" >

      </el-col>
      <el-col :span="6" style=" align-items: stretch; max-height:500px;">
        <loginTabs />
      </el-col>
      
    </el-row>
    
  </div>
</template>

<style scoped>
.login-page {
  height: 500px;
}
.login-title{
  text-align: center;
  font-size: 30px;
  margin-top: 50px;
}
.login-container{
  height: 100%;
  display: flex;
  justify-content: center;
}

.login-logo{
  width: 100%;
  height: 100%;
  align-items: stretch;
  background-size: cover;
  background-position: center;
  border-radius: 8px 0 0 8px;
  background-image: url('https://images.pexels.com/photos/276092/pexels-photo-276092.jpeg?auto=compress&cs=tinysrgb&w=600');
}
</style>
