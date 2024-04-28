<script setup>
import {onMounted ,ref, onUnmounted} from 'vue';
import axios from 'axios';
const iframeRef = ref(null);
const systemOneInfo  = ref('');

onMounted(() => {
  window.addEventListener('message', messageListener);
  const token = location.href.split('=')[1];
  if (token) {
    localStorage.setItem('token', token);
    sendClientToken();
  }
  if (!localStorage.getItem('token')) {
    window.location.href = `http://localhost:5000?url=${window.location.href}`;

  }
});

/**
 * @description 监听子系统2的消息
**/
const messageListener = (e) => {
  console.log(e.data,e.origin)
  if (e.origin === 'http://localhost:4000') {
    localStorage.setItem('test2', e.data);
  }
}

/** 
 * @description: 发送信息给子系统2
 *   
**/ 
const sendClientToken = () => {
  const targetWindow = iframeRef.value.contentWindow;
  targetWindow.postMessage('子系统1给子系统2的信息', 'http://localhost:4000/');

  
}

/**   
 * @description 用于获取子系统1服务器信息
 * 
*/
const getServerOneInfo = async() => {

  const res  = await axios({
    url: 'http://127.0.0.1:3001',
    method: 'get',
    headers: {
      token: localStorage.getItem('token')
    }
  })
  systemOneInfo.value = res.data;
  console.log(systemOneInfo.value)
};


onUnmounted(() => {
  window.removeEventListener('message', messageListener);
});
</script>

<template>
  <div>
    <h1>子系统1</h1>
    <!-- <button @click="sendClientToken">发送信息个子系统2</button> -->
    <button @click="getServerOneInfo">获取子系统1服务器信息(需要token)</button>
    <h1>{{systemOneInfo}}</h1>
    <iframe src="http://localhost:4000/" ref="iframeRef" style="display: none;"></iframe>
  </div>
</template>

<style scoped>

</style>
