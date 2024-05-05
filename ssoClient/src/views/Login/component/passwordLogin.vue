<script setup lang="ts">
import {ref,reactive} from "vue"
import {validatePassword} from "@/utils/validate";
const ruleFormRef = ref(null);
const ruleForm = ref({
    username: '',
    password: '',
});

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { validator: validatePassword, trigger: 'blur' },

    ],
});


const submitForm = () => {

}



</script>
<template>
    <el-form
            :rules="rules"
            :model="ruleForm"
            ref="ruleFormRef"
            style="max-width: 600px"
            label-width="auto"
            label-position="top"
            hide-required-asterisk="true"
            status-icon
        >
            <el-form-item label="用户名" prop="username" >
                <el-input v-model="ruleForm.username" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item > 
                <div style="display: flex; justify-content: center; width: 100%;">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </div>
            </el-form-item>
        </el-form>




</template>
<style lang="scss" scoped>




</style>
