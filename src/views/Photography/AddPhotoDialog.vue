<template>
  <el-dialog title="上传图片" 
  :visible.sync="dialogFormVisible" 
  v-model="dialogFormVisible"
  width="30%">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="图片名称" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="拍摄地点" prop="location">
        <el-input v-model="form.location" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-upload
      ref="upload"
      drag
      action=""
      accept="image/jpeg,image/png"
      :file-list="fileList"
      :on-change="onUploadChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm(formRef)">取 消</el-button>
      <el-button type="primary" @click="submitUpload(formRef)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang=ts>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import {  ElMessage } from "element-plus";
import {add} from '../../http/modules/photo'

const emit = defineEmits(['onAddPhotoSucceed'])
const dialogFormVisible = ref(false);
const fileList = ref();
fileList.value = [];
const formRef = ref<FormInstance>()
const form = reactive({
title: "",
  location: "",
  file: null,
});

const rules = reactive<FormRules>({
  title: [
    { required: true, message: "请输入图片标题", trigger: "blur" },
    { min: 1, max: 200, message: "长度在 1 到 200 个字符", trigger: "blur" },
  ],
  location: [{ required: true, message: "请输入拍摄地点", trigger: "blur" }],
});

const submitUpload = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      add(form.title, form.location, form.file.raw)
      .then(res=>{
         if (res.successful) {
              ElMessage({message: '添加图片成功', type: 'success'})
              emit('onAddPhotoSucceed')
              hide()
              if (!formEl) return
              formEl.resetFields()
            }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const onUploadChange = (file, fileList)=>{
const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
if (!isIMAGE) {
        ElMessage.error('只能上传jpg/png图片!')
        return false
      }

      if (fileList.length > 0) {
        fileList = [fileList[fileList.length - 1]]
      }

      form.file = file
}
const show = ()=>{
  console.log("我进来了")
  dialogFormVisible.value = true
}
defineExpose({ show });

const hide = ()=>{
  dialogFormVisible.value = false
}
const resetForm = (formEl: FormInstance | undefined)=>{
  hide()
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
</style>
