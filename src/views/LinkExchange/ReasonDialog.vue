<template>
  <el-dialog title="补充信息" :visible.sync="dialogFormVisible" v-model="dialogFormVisible" width="30%">
    <el-form ref="uploadForm" :model="form" label-width="80px">
      <el-form-item label="id" prop="id">
        <el-input v-model="form.id" readonly="readonly" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="action" prop="action">
        <el-input v-model="form.action" readonly="readonly" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="reason" prop="reason">
        <el-input v-model="form.reason" autocomplete="off" placeholder="输入通过/拒绝原因"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm(ruleFormRef)">取 消</el-button>
      <el-button type="primary" @click="submitForm()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref,reactive } from 'vue'
import type { FormInstance } from 'element-plus'

const emit = defineEmits(['addReason'])

const ruleFormRef = ref<FormInstance>()

const dialogFormVisible = ref(false)
const form = reactive({
  id: 0,
  reason: '',
  action: ''
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const show = (id, action) =>{
  form.id = id
  form.action = action
  dialogFormVisible.value = true
}
const hide = () => {
  console.log(13213)
  dialogFormVisible.value = false
}

defineExpose({ show });

const submitForm = () => {
      console.log('submit!')
      hide()
      resetForm(ruleFormRef.value)
      emit('addReason',form.id,form.action,form.reason)
}
</script>