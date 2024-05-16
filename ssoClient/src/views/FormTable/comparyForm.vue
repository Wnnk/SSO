<script setup lang='ts'>
import {ref} from 'vue';

const formData = ref({
  comparyName: 'xx有限公司',
  comparyType: 'gg',
  comparyAddress: '广州',
})
const validate = () => {
  console.log('form2测试验证')
  return true;
}
defineExpose({
  validate,
  formData,
})
</script>

<template>
  <div>
    
  </div>
</template>

<style lang='scss' scoped>
</style>