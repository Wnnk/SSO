<script setup>
import cryptor from './JSEncrypt'
import axios from 'axios'
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
  <div>
    <h1>SSO认证系统</h1>
    <button @click="test">登录</button>
  </div>
</template>

<style scoped>

</style>
