<template>
  <el-dialog title="添加配置" :visible.sync="dialogFormVisible" v-model="dialogFormVisible" width="30%">
    <el-form ref="uploadForm" :model="form" :rules="formRules" label-width="80px">
      <el-form-item label="key" prop="key">
        <el-input v-model="form.key" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="value" prop="value">
        <el-input v-model="form.value" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="description" prop="description">
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitUpload">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang=ts>
import { ref } from "vue";

const props = defineProps({
  onAddSucceed: {
      type: Function
    },
    onUpdateSucceed: {
      type: Function
    }
})

const dialogFormVisible = ref(false)
const mode = ref('add')
const form = ref()
form.value = {
          key: '',
        value: '',
        description: null
}
const show = ()=>{
   console.log("我进来了")
  dialogFormVisible.value = true
}
defineExpose({ show });
const hide = ()=>{
  dialogFormVisible.value = false
}
</script>

<style scoped>

</style>
