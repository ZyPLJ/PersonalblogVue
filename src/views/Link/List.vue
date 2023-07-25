<template>
  <el-container>
    <el-header height="30px">
      <el-row type="flex" justify="start">
        <div>
          <el-button @click="handleAdd">添加</el-button>
          <AddLinkDialog ref="addDialog" @onAddSucceed="onAddSucceed"
                             @onUpdateSucceed="onUpdateSucceed"></AddLinkDialog>
        </div>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        ref="table"
        :data="data"
        height="730"
        stripe
        style="width: 100%"
        :default-sort="{prop: 'time',order:'descending'}">
        <el-table-column
          type="selection"
          width="30"/>
        <el-table-column
          prop="id"
          label="id"
          width="100"/>
        <el-table-column
          prop="name"
          label="name"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="url"
          label="url"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="favicon"
          label="favicon"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="description"
          label="description"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="visible"
          label="visible"
        >
          <template #default="{row}">
            <el-tag size="medium" v-if="row.visible">{{ row.visible }}</el-tag>
            <el-tag size="medium" v-else type="danger">{{ row.visible }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template #default="{row}">
            <el-link type="info" @click="onItemEditClick(row)">编辑</el-link>
            <el-link type="danger" @click="onItemDeleteClick(row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script setup>
import AddLinkDialog from "./AddDialog.vue"
import { ref, onMounted } from 'vue'
import {getAll,deleteItem} from '../../http/modules/link'
import { ElMessage,ElMessageBox  } from 'element-plus'

const data = ref([])
const addDialog = ref(null)

const loadData = () => {
  getAll()
    .then(res => data.value = res.data)
    .catch(res => ElMessage.error(`获取列表出错：${res.message}`))
}
const handleAdd = () => {
  addDialog.value.show()
}
const onItemEditClick = (item) => {
  addDialog.value.edit(item)
}
const onItemDeleteClick = (item) => {
  ElMessageBox.confirm(
    '此操作将删除该链接, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteItem(item.id)
      .then(res => ElMessage.success(`删除成功。${res.message}`))
      .catch(res => ElMessage.error(`操作失败。${res.message}`))
      .finally(() => loadData())
    }).catch(() => ElMessage('已取消删除'))
}
const onAddSucceed = () => {
  loadData()
}
const onUpdateSucceed = () => {
  loadData()
}
onMounted(loadData)
</script>
<style scoped>
</style>