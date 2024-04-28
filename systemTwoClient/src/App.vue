<script setup lang='ts'>
import { onUnmounted, ref, onMounted } from 'vue';
const iframeRef = ref(null);
const systemTwoInfo = ref('');
import axios from 'axios';

onMounted(() => {
   window.addEventListener('message', messageListen);
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
 * @description: 监听子系统1的消息
 */
const messageListen = (e) => {
  if (e.origin === 'http://localhost:3000') {
    localStorage.setItem('message', e.data);
  }
}

/** 
 * @description: 发送消息给子系统1
  */
const sendClientToken = () => {
  const targetWindow = iframeRef.value.contentWindow;
  targetWindow.postMessage('子系统2给子系统1的信息', 'http://localhost:3000/');
}

/** 
 * @description: 接收子系统2服务器的消息
 * 
  */
const getServerTwoInfo = async () => {
  const res  = await axios({
    url: 'http://127.0.0.1:3001',
    method: 'get',
    headers: {
      token: localStorage.getItem('token')
    }
  })
  systemTwoInfo.value = res.data;
};


onUnmounted(() => {
  window.removeEventListener('message', messageListen);
})
</script>

<template>
  <div>
    <h1>子系统2</h1>
    <!-- <button @click="sendClientToken">点击发送消息给子系统1</button> -->
    <button @click="getServerTwoInfo">接收子系统2服务器的消息(需要token)</button>
    <h1>{{systemTwoInfo}}</h1>
    <iframe src="http://localhost:3000/" ref="iframeRef" style="display: none;"></iframe>
  </div>
</template>

<style lang='scss' scoped>
</style>