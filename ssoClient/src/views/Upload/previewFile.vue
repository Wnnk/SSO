<script setup lang="ts">
import {ref, watchEffect} from "vue"
const urlExt = ref('')
const props = defineProps<{ url: string }>()
watchEffect(() => {
  urlExt.value = props.url.split('.').pop()
  console.log(urlExt.value)
})


</script>
<template>
  <div class="preview-container">
    <img  alt="preview" :src="url" class="preview-image" v-if="urlExt === 'jpg' || urlExt === 'png' || urlExt === 'jpeg'"/>
    <video :src="url" class="preview-video" v-else-if="urlExt === 'avi' || urlExt ==='mp4' || urlExt ==='mov'" controls></video>
    <audio :src="url" class="preview-audio" v-else-if="urlExt === 'wav' || urlExt ==='mp3'" controls></audio>
    <embed :src="url" class="preview-embed" :key="url" v-else-if="urlExt === 'pdf' "/>
  </div>
</template>
<style lang="scss" scoped>
.preview-container{
  border: red solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.preview-image{
  max-width: 500px;
  max-height: 500px;
}
.preview-embed{
  width: 100vh;
  height: 100vh;
}




</style>
