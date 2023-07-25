<template>
  <el-table :data="tableData" :height="600" stripe style="width: 100%">
    <el-table-column prop="id" label="ID" width="50"> </el-table-column>
    <el-table-column prop="name" label="推荐名称" width="250">
    </el-table-column>
    <el-table-column
      prop="description"
      label="推荐说明"
      width="300"
      :show-overflow-tooltip="true"
    >
    </el-table-column>
    <el-table-column prop="iconCssClass" label="图标" width="200">
    </el-table-column>
    <el-table-column prop="category.id" label="分类ID" width="80">
    </el-table-column>
    <el-table-column prop="category.name" label="分类名称"> </el-table-column>
    <el-table-column align="right">
      <template #header slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template #default="scope">
        <el-button
          size="mini"
          type="warning"
          plain
          @click="cancelFeatured(scope.$index, scope.row)"
          >取消推荐
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang='ts'>
import { ref, computed } from "vue";
import { getAll,deleteItem } from "../../http/modules/featuredCategory";
import { ElMessageBox, ElMessage } from "element-plus";

const data = ref();
data.value = [];
const search = ref("");

const tableData = computed(() => {
  return data.value.filter(
    (item) => !search.value || item.name.toLowerCase().includes(search.value)
  );
});

const cancelFeatured = (index, item) => {
  ElMessageBox.confirm("确定吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteItem(item.id)
        .then((res) => ElMessage.success(`操作成功。${res.message}`))
        .catch((res) => ElMessage.error(`操作失败。${res.message}`))
        .finally(()=>loadData())
    })
    .catch(() => ElMessage.warning("操作取消"));
};

const loadData = () => {
  getAll().then((res) => (data.value = res.data));
};
loadData();
</script>

<style scoped>
</style>
