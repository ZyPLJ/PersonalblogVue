<template>
      <el-dialog
    title="修改分类信息"
    :visible.sync="dialogFormVisible"
    v-model="dialogFormVisible"
  >
     <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
      <el-form-item label="分类名称"  prop="Name">
        <el-input type="text" v-model="ruleForm.Name"></el-input>
      </el-form-item>
      <el-form-item
        label="设置为二级目录(输入0为1级目录)"
        prop="ParentId"
      >
        <el-input v-model="ruleForm.ParentId" type="text"></el-input>
      </el-form-item>
      <el-form-item label="二级分类" prop="categoryId">
          <el-select
            v-model="ruleForm.ParentId"
            filterable
            allow-create
            default-first-option
            placeholder="请选择分类"
            :reserve-keyword="false"
            v-on:change="handleCategoryChange2"
          >
          <el-option key="0" label="一级目录" value="0"></el-option>
          <template v-for="item in categories">
              <el-option
                v-if="item.parentId === 0 && item.name != ruleForm.Name"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
          </template>
          </el-select>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm(ruleFormRef)">取 消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>
    </div>
</el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose,defineProps } from "vue";
import { FormInstance, FormRules,ElMessage } from "element-plus";
import { get,getAll,Update } from "../../http/modules/category";


const ruleFormRef = ref<FormInstance>();
const categoryId = ref();
const dialogFormVisible = ref(false);
const categories = ref();
categories.value = [];

const ruleForm = reactive({
    Name: "",
    ParentId: 0
});

const props = defineProps({
  load: Function
});

const load =async () =>{
    var res = (await get(categoryId.value)).data;
    var res2 = (await getAll()).data
    ruleForm.Name = res.name;
    ruleForm.ParentId = res.parentId
    categories.value = res2
}

const dialogshow = (id) => {
  categoryId.value = id
  console.log(categoryId.value)
  load()
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
      try {
        var res = (await Update(categoryId.value ,ruleForm)).data
        formEl.resetFields()
        hide()
        props.load();
        ElMessage.success("操作成功")
      } catch (error) {
        ElMessage.error(`操作失败。${res.message}`)
      } finally {
        close;
      }
    }
  });
};

const rules = reactive<FormRules>({
    Name:[{ required: true, message: '请填写名称', trigger: 'blur' }],
    ParentId:[{ required: true, message: '请填写级别', trigger: 'blur' }]
})

const handleCategoryChange2 = (id) => {
    console.log(id)
};
</script>