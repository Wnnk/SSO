<script setup>
import {onMounted ,ref, onUnmounted} from 'vue';
import instance from '@/api/instance'

const iframeRef = ref(null);
const systemOneInfo  = ref('');

onMounted(() => {
  const currentUrl = window.location.href;
  const urlToken = currentUrl.split('=')[1]
  if (urlToken) {
    localStorage.setItem('token', urlToken);
    window.location.href = 'http://localhost:3000';
  }
  iframeRef.value.onload = function() {
    sendClientToken();
  };
  
  window.addEventListener('message', messageListener);
});



/**
 * @description 监听子系统2的消息
**/
const messageListener = (e) => {
  console.log(e.data,e.origin)
  if (e.origin === 'http://localhost:4000') {
    localStorage.setItem('token', e.data);
  }
}

/** 
 * @description: 发送信息给子系统2
 *   
**/ 
const sendClientToken = () => {
  const targetWindow = iframeRef.value.contentWindow;
  if (localStorage.getItem('token')) {
     targetWindow.postMessage(localStorage.getItem('token'), 'http://localhost:4000');
  }
 

  
}

/**   
 * @description 用于获取子系统1服务器信息
 * 
*/
const getServerOneInfo = async() => {
  const res = await instance.get('/');
  systemOneInfo.value = res.data;
};


onUnmounted(() => {
  window.removeEventListener('message', messageListener);
});
</script>

<template>
  <div>
    <h1>子系统1</h1>
    <button @click="getServerOneInfo">获取子系统1服务器信息(需要token)</button>
    <h1>{{systemOneInfo}}</h1>
    <iframe src="http://localhost:4000/" ref="iframeRef" style="display:none;"></iframe>
  </div>
</template>

<style scoped>

</style>
