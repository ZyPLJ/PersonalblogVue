<template>
  <el-form
    :model="ruleForm"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
    :rules="rules"
    ref="ruleFormRef"
  >
    <div class="title h2">
      <h2>ZY知识库</h2>
      <h4>管理后台登录</h4>
    </div>
    <el-form-item prop="username">
      <el-input
        type="text"
        v-model="ruleForm.username"
        auto-complete="off"
        placeholder="用户名"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="ruleForm.password"
        auto-complete="off"
        placeholder="密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-row :gutter="8">
        <el-col :span="12">
          <el-button 
          type="warning" 
          plain 
          class="w-100"
          @click="resetForm(ruleFormRef)">重 置</el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            class="w-100"
            @click="submitForm(ruleFormRef)"
            :loading="loading"
            >登 录</el-button
          >
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script setup lang=ts>
import { ref, reactive } from "vue";
import { logincookie } from "../utils/auth";
import { login } from "../http/modules/auth";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
let loading = ref();
loading.value = false;
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: "",
  password: "",
});
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请填写账号！"));
  } else {
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请填写密码！"));
  } else {
    callback();
  }
};
const rules = reactive({
  username: [{ validator: validatePass, trigger: "blur" }],
  password: [{ validator: validatePass2, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      console.log("submit!");
      loading.value = true;
      var data = {
        Username: ruleForm.username,
        Password: ruleForm.password,
      };
      const res = await login(JSON.stringify(data));
      console.log(res.data.statusCode);
      try {
        if (res.data.statusCode == 200) {
          //保存登录信息
          logincookie(res.data.data.token, data.Username, res.data.data.expiration)
          //登录成功
          ElMessage.success("登录成功！")
          router.push('/')  
        } else {
          ElMessage.error(`登录失败:${res.data.message}`);
        }
      } catch (error) {
        ElMessage.error(`登录失败:${error.message}`);
      } finally {
        loading.value = false;
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #505458;
  }
}
</style>
