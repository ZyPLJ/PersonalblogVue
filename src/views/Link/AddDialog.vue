<template>
  <el-dialog title="添加友情链接" :visible.sync="dialogFormVisible" v-model="dialogFormVisible" width="30%">
    <el-form ref="ruleFormRef" :model="form" :rules="formRules" label-width="80px">
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="form.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="favicon" prop="favicon">
        <el-input v-model="form.favicon" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="description" prop="description">
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="visible" prop="visible">
        <el-switch v-model="form.visible"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm(ruleFormRef)">取 消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref,reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import {add,update} from '../../http/modules/link'

const ruleFormRef = ref<FormInstance>()
const dialogFormVisible = ref(false)
const mode = ref('add')
const form = reactive({
  id:0,
  name: '',
  url: '',
  favicon:'',
  description: null,
  visible: 1
})
const emit = defineEmits(['onAddSucceed','onUpdateSucceed'],)

const formRules = reactive<FormRules>({
  name:[{ required: true, message: '请输入 name', trigger: 'blur' }],
  url:[{ required: true, message: '请输入 url', trigger: 'blur' }],
  favicon:[{ required: true, message: '请输入网站图标', trigger: 'blur' }],
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const edit = (item)=> {
    mode.value = 'edit'
    form.name = item?.name
    form.url = item?.url
    form.description = item?.description
    form.visible = item?.visible
    form.id = item?.id
    form.favicon = item?.favicon
    show()
}

const show = () => {
  console.log(13213)
  dialogFormVisible.value = true
}

const hide = () => {
  console.log(13213)
  dialogFormVisible.value = false
}

defineExpose({ show,hide,edit });


const submitForm = (formEl: FormInstance | undefined) => {
  console.log(123)
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (mode.value === 'add') {
        console.log('add!')
      add(form)
        .then(res => {
          if (res.successful) {
            ElMessage({message: '添加成功', type: 'success'})
            formEl.resetFields()
            hide()
            emit('onAddSucceed')
          }
        })
        .catch(res => {
          ElMessage({message: `添加失败！${res.message}`, type: 'error'})
        })
    }
    if (mode.value === 'edit') {
      console.log('edit!')
      update(form)
        .then(res => {
          if (res.successful) {
            ElMessage({message: '修改成功', type: 'success'})
            formEl.resetFields()
            hide()
            emit('onUpdateSucceed')
          }
        })
        .catch(res => {
          ElMessage({message: `修改失败！${res.message}`, type: 'error'})
        })
    }
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<style scoped></style>