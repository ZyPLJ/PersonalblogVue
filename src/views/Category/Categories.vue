<template>
  <el-row>
    <el-col>
      <el-table
        :data="tableData"
        :height="800"
        style="width: 100%;">
        <el-table-column
          prop="id"
          label="ID"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="250">
        </el-table-column>
        <el-table-column
          align="right">
          <template v-slot:header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template #="{ row, $index }">
            <el-button size="mini" type="success" plain @click="setFeatured($index, row)">
              设置推荐
            </el-button>
            <el-button size="mini" type="warning" plain @click="CancelFeatured($index, row)">
              取消推荐
            </el-button>
            <el-button v-if="row.visible===true" size="mini" type="primary" plain
                       @click="SetInvisible(row)">
              <i class="fa fa-eye-slash fa-lg" aria-hidden="true"></i>
            </el-button>
            <el-button v-if="row.visible===false" size="mini" type="danger" plain @click="SetVisible(row)">
              <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
            </el-button>
            <SetFeaturedDialog ref="setFeaturedDialog"></SetFeaturedDialog>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script setup lang='ts'>
import SetFeaturedDialog from "./SetFeaturedDialog.vue"
import {ref,computed,onMounted} from 'vue'
import {getAll,cancelFeatured,setVisible,setInvisible} from '../../http/modules/category'
import { ElMessageBox,ElMessage } from "element-plus";

const data = ref()
data.value = []
const search = ref()
const setFeaturedDialog = ref(null)

onMounted(()=>{
  
})

const tableData = computed(()=>{
    return data.value.filter(item =>
        !search.value || item.name.toLowerCase().includes(search.value))
})

const loadData = async()=>{
    var res = await getAll()
    data.value = res.data
}

const setFeatured = (index,item) =>{
  console.log(item.id)
  setFeaturedDialog.value.dialogshow(item.id)
}

const CancelFeatured = (index,item) =>{
    ElMessageBox.confirm("确定吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(()=>{
      cancelFeatured(item.id)
      .then(res => ElMessage.success(`操作成功。${res.message}`))
      .catch(res => ElMessage.error(`操作失败。${res.message}`))
  }).catch(() => ElMessage.warning('操作取消'))
}

const SetVisible = (item)=>{
        setVisible(item.id)
        .then(res => ElMessage.success(`操作成功。${res.message}`))
        .catch(res => ElMessage.error(`操作失败。${res.message}`))
        .finally(() => loadData())
}

const SetInvisible = (item) =>{
        setInvisible(item.id)
        .then(res => ElMessage.success(`操作成功。${res.message}`))
        .catch(res => ElMessage.error(`操作失败。${res.message}`))
        .finally(() => loadData())
}
loadData()
</script>

<style scoped>

</style>
