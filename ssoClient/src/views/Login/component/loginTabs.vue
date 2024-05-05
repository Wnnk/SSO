<script setup lang="ts">
import userRegister from '@/views/Login/component/userRegister.vue';
import passwordLogin from '@/views/Login/component/passwordLogin.vue';

</script>
<template>
  <div class="login-container">
   <el-tabs>
    <el-tab-pane label="用户注册">
        <userRegister />
    </el-tab-pane>
    <el-tab-pane label="密码登录">
        <passwordLogin />
    </el-tab-pane>
    <el-tab-pane label="短信登录">
        h2
    </el-tab-pane>
   
   </el-tabs>

  </div>
</template>


<style  scoped>
.login-container{
    border: 1px solid #ccc;
    border-radius: 0px 8px 8px 0px;
    width: 100%;
}


</style>
