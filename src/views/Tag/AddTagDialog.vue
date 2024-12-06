<template>
    <el-dialog
    :visible.sync="dialogFormVisible"
    v-model="dialogFormVisible"
    :title="title"
    width="30%"
  >
  <el-form
    :model="ruleForm" 
    :rules="rules"
    ref="ruleFormRef"
    label-width="80px"
    class="demo-ruleForm"
    status-icon
  >
  <el-form-item label="标签名" prop="Name">
      <el-input type="text" v-model="ruleForm.Name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      <el-button @click="dialogFormVisible = false">取消</el-button>
    </el-form-item>
</el-form>
  </el-dialog>
</template>
<script setup lang=ts>
import { reactive, ref,defineExpose,defineProps } from "vue";
import { FormInstance, FormRules,ElMessage } from "element-plus";
import { addTag,UpdateTag } from "../../http/modules/Tag";

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  Name: "",
});
const mode = ref(""); // 模式：edit-编辑标签，add-新增标签
const title = ref("")
const id = ref("")

const props = defineProps({
  load: Function
});


const dialogFormVisible = ref(false);

const show = (Tag,isEdit) => {
    mode.value = isEdit;
      if (mode.value === 'edit') {
      title.value = "编辑标签"
      ruleForm.Name = Tag.name;
      id.value = Tag.id
    } else {
      title.value = "新增标签"
      ruleForm.Name = "";
    }
    dialogFormVisible.value = true;
}


const submitForm =(formEl: FormInstance | undefined) => {
  if (!formEl) return;
    formEl.validate(async (valid) => {
      if (valid) {
        if(mode.value === 'add'){
          console.log("新增标签")
          try{
            const res = await addTag(ruleForm)
            ElMessage.success(`${res.message}`)
            formEl.resetFields()
            dialogFormVisible.value = false
            props.load()
          }catch(error){
            ElMessage.warning(`${error.message}`)
          }
        }else{
          try{
            const res = await UpdateTag(id.value,ruleForm)
            ElMessage.success(`${res.message}`)
            formEl.resetFields()
            dialogFormVisible.value = false
            id.value = ""
            props.load()
          }catch(error){
            ElMessage.warning(`${error.message}`)
          }
        }
      }
  });
};

const rules = reactive<FormRules>({
    Name:[{ required: true, message: '请填写标签名', trigger: 'blur' }],
})

defineExpose({ show });
</script>