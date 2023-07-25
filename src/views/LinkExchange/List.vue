<template>
  <div>
    <ReasonDialog ref="addReasonDialog" @addReason="addReason" />
    <el-table
      ref="table"
      v-bind:data="data"
      height="730"
      stripe
      style="width: 100%"
      :default-sort="{ prop: 'time', order: 'descending' }"
    >
      <el-table-column type="selection" width="30" />
      <el-table-column prop="id" label="id" width="100" />
      <el-table-column prop="name" label="name" :show-overflow-tooltip="true" />
      <el-table-column prop="description" label="description" :show-overflow-tooltip="true" />
      <el-table-column prop="url" label="url" :show-overflow-tooltip="true" />
      <el-table-column prop="webMaster" label="webMaster" :show-overflow-tooltip="true" />
      <el-table-column prop="email" label="email" :show-overflow-tooltip="true" />
      <el-table-column prop="verified" label="verified">
        <template #default="{ row }">
          <el-tag size="medium" v-if="row.verified">{{ row.verified }}</el-tag>
          <el-tag size="medium" v-else type="danger">{{ row.verified }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="reason" :show-overflow-tooltip="true" />
      <el-table-column prop="applyTime" label="申请时间" :show-overflow-tooltip="true" />
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="{ row }">
          <el-link type="primary" @click="refsaccept(row)">通过</el-link>
          <el-link type="info" @click="refsreject(row)">拒绝</el-link>
          <el-link type="danger" @click="onItemDeleteClick(row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import ReasonDialog from './ReasonDialog.vue'
import formatTime from '../../utils/dateTime';
import {getAll,deleteItem,accept,reject} from '../../http/modules/linkExchange'
import { ElMessage,ElMessageBox } from 'element-plus'

const data = ref([])
const addReasonDialog = ref(null)

const loadData = async () => {
  const format = 'yyyy-MM-dd HH:mm:ss';
  try {
    const res = await getAll()
    data.value = res.data.map(item =>{
      return{
        ...item,
        applyTime:formatTime(item.applyTime,format)
      }
    })
  } catch (error) {
    ElMessage.error(`获取列表出错：${res.message}`)
  }
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
const addReason = (id, action, reason) => {
  console.log(id, action, reason)
  let promise = undefined
  if (action === 'accept') {
    promise = accept(id, reason)
  } else if (action === 'reject') {
    promise = reject(id, reason)
  }
  if (promise) {
    promise
      .then((res) => ElMessage.success('操作成功'))
      .catch((res) => ElMessage.error(`操作失败。${res.message}`))
      .finally(() => loadData())
  }
}
const refsaccept = (item) => {
  addReasonDialog.value.show(item.id, 'accept')
}
const refsreject = (item) => {
  addReasonDialog.value.show(item.id, 'reject')
}
onMounted(loadData)
</script>
<style scoped></style>