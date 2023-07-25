<template>
  <el-container>
    <el-header height="30px">
      <el-row type="flex" justify="start">
          <div>
            <el-button type="success" @click="centerDialogVisible = true" style="float:left;">
            添加公告
          </el-button>
          </div>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="data" style="width: 100%">
      <el-table-column label="主键" prop="id" />
      <el-table-column label="正文" prop="content"/>  
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    </el-main>
  </el-container>

<el-dialog
    v-model="centerDialogVisible"
    title="添加公告"
    width="30%"
    align-center
  >
  
  <el-form
    ref ='ruleFormRef'
    label-position="top"
    label-width="100px"
    :model="ruleForm"
    style="max-width: 460px"
    :rules="rules"
  >
    <el-form-item label="内容" prop="Content">
      <el-input v-model="ruleForm.Content" type="text"/>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button>
    </el-form-item>
  </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import {getNotice,delNotice,addNotice} from "../../http/modules/notice"
  import {ElMessage} from 'element-plus'
  import type { FormInstance, FormRules } from 'element-plus'

const data = ref();
const centerDialogVisible = ref(false)
const search = ref('')

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  Content: '',
})

const handleDelete = async (index: number, row) => {
    console.log(index, row.id)
    var res = await delNotice(row.id)
    if(res.statusCode == 200){
        ElMessage.success(res.message)
    }else{
        ElMessage.error(res.message)
    }
    load()
  }

  const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      var res = await addNotice(ruleForm.Content)
        if(res.statusCode == 200){
            ElMessage.success(res.message)
        }else{
            ElMessage.error(res.message)
        }
        ruleForm.Content = ""
        centerDialogVisible.value = false
        load() 
    } else {
      console.log('error submit!', fields)
    }
  })
}


const rules = reactive<FormRules>({
    Content: [
        { required: true, message: '内容不能为空', trigger: 'blur'},
        { min: 1, max:18, message: '长度不能超过18', trigger: 'blur'},
    ],
})

const load = async ()=>{
     var res = await getNotice()
     data.value = res.data
}
load();
</script>
<style scoped>
.dialog-footer button:first-child {
margin-right: 10px;
}
</style>
  