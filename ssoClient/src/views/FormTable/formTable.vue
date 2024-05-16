<script setup lang='ts'>
import { ref } from 'vue';
import baseForm from './baseForm.vue';
import comparyForm from './comparyForm.vue';
const form1 = ref(null);
const form2 = ref(null);
const formDataMap = ref({
  form1: {
    name: '年华',
    age: 25,
  },
  form2: {
    comparyName: 'xx有限公司',
    comparyType: 'gg',
    comparyAddress: '广州',
  }
});
const formRefs = {
  form1,
  form2
};

const handleSave = () => {
  const formKeys = Object.keys(formDataMap.value);
  const validResult = formKeys.map((formKey) => {
    /* 调用子组件的校验方法 */
    return formRefs[formKey].value.validate();
  });
  if (validResult.every((result) => result)) {
    const formData = {};
    formKeys.forEach((formKey) => {
      const partFormData = formRefs[formKey].value.formData;
      Object.assign(formData, partFormData);
      console.log(formData);
    });
  }
};
</script>

<template>
  <div class="form-wrapper">
    <el-button type="primary" @click="handleSave">保存</el-button>
    <baseForm ref="form1" :data="formDataMap.form1"/>
    <comparyForm ref="form2" :data="formDataMap.form2"/>


  </div>
</template>

<style lang='scss' scoped>
</style>
