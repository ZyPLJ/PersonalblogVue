<template>
  <el-table
    :data="list"
    style="width: 100%"
  >
    <el-table-column prop="id" label="文章Id" width="180" />
    <el-table-column prop="title" label="文章标题" width="180" />
    <el-table-column prop="categories.name" label="分类名称" />
    <el-table-column
          prop="creationTime"
          label="创建时间"
          sortable
         />
    <el-table-column
      prop="lastUpdateTime"
      label="上次更新"
      sortable
      />
    <el-table-column prop="viewCount" label="阅读量" />
  </el-table>
</template>

<script setup lang=ts>
import { ref, onMounted,computed } from "vue";
import { top } from "../../http/modules/blog";
import { ElMessage } from "element-plus";
import formatTime from '../../utils/dateTime';

const data = ref();
const loading = ref(false)
const format = 'yyyy-MM-dd HH:mm:ss';

onMounted(async () => {
  data.value = (await top()).data;
  data.value.forEach(item => {
      item.creationTime = formatTime(item.creationTime,format)
      item.lastUpdateTime = formatTime(item.lastUpdateTime,format)
    })
  loading.value = true
});

const list = computed(()=>{
  return data.value;
})
</script>

<style scoped>
</style>
