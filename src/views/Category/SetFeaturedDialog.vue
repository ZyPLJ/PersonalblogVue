<template>
  <el-dialog
    title="推荐分类信息"
    :visible.sync="dialogFormVisible"
    v-model="dialogFormVisible"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
      <el-form-item label="推荐名称" :label-width="formLabelWidth" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item
        label="说明"
        :label-width="formLabelWidth"
        prop="description"
      >
        <el-input v-model="ruleForm.description" type="text"></el-input>
      </el-form-item>
      <el-form-item
        label="图标类名"
        :label-width="formLabelWidth"
        prop="iconCssClass"
      >
        <el-input v-model="ruleForm.iconCssClass" type="text"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm(ruleFormRef)">取 消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, reactive, defineExpose } from "vue";
import { FormInstance, FormRules,ElMessage } from "element-plus";
import { setFeatured } from "../../http/modules/category";

const ruleFormRef = ref<FormInstance>();
const categoryId = ref();
const dialogFormVisible = ref(false);
const formLabelWidth = ref();
formLabelWidth.value = "120px";

const ruleForm = reactive({
  name: "",
  description: "",
  iconCssClass: "",
});

const dialogshow = (id) => {
  console.log(id);
  categoryId.value = id
  dialogFormVisible.value = true;
};

defineExpose({ dialogshow });

const hide = () => {
  dialogFormVisible.value = false;
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


const submitForm =(formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      console.log("submit!")
      try {
        var res = (await setFeatured(categoryId.value, ruleForm)).data;
        console.log(res);
        ElMessage.success(`操作成功。${res.message}`)
        formEl.resetFields()
      } catch (error) {
        ElMessage.error(`操作失败。${res.message}`)
      } finally {
        close;
      }
    }
  });
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请填写"));
  } else {
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请填写"));
  } else {
    callback();
  }
};
const validatePass3 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请填写"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  name:[{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
  description:[{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
  iconCssClass:[{ required: true, message: 'Please input Activity name', trigger: 'blur' }]
})
</script>

<style scoped>
</style>
