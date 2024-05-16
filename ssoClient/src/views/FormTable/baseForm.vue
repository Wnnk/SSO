<script setup lang='ts'>
import { ref } from 'vue';
type FormDataType = {
  name: string;
  age: number;
}
const { data } = defineProps<{
  data: FormDataType;
}>()

const form = ref<HTMLFormElement>(null);
const rules = ref({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须为数字', trigger: 'blur' },
  ],
});
const validate = (): boolean => {
  console.log('form1测试验证')
  return true;
}

defineExpose({
  validate,
  formData,
})
</script>

<template>
  <div>
    <el-form ref="form" 
    :model="formData" 
    label-width="80px" 
    size="small"
    :rules="rules"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formData.age" prop="age" type="number"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang='scss' scoped>
</style>