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
      <el-form-item label="评论是否可见" prop="isShowComment">
        <el-input v-model="form.isShowComment" autocomplete="off"></el-input>
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
import { add} from "../../http/modules/config";

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
  description: null,
  isShowComment:null
}
const show = ()=>{
   console.log("我进来了")
  dialogFormVisible.value = true
}
defineExpose({ show });
const emit = defineEmits(['load'])
const hide = ()=>{
  dialogFormVisible.value = false
}
const submitUpload = async()=>{
  var res = await add(form.value)
  console.log(res)
  hide()
  emit("load")

}
</script>

<style scoped>

</style>
