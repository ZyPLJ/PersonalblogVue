<template>
  <el-row>
    <el-col>
      <el-table :data="tableData" :height="800" style="width: 100%">
        <el-table-column prop="id" label="ID" width="50"> </el-table-column>
        <el-table-column prop="post.id" label="文章ID" width="150">
        </el-table-column>
        <el-table-column prop="post.categories.name" label="文章分类" width="250">
        </el-table-column>
        <el-table-column
          prop="post.title"
          label="文章标题"
          width="400"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
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
    </el-col>
  </el-row>
</template>

<script setup lang=ts>
import { ref, computed } from "vue";
import { getAll, deleteItem } from "../../http/modules/featuredPost";
import { ElMessage, ElMessageBox } from "element-plus";

const data = ref();
data.value = [];
const search = ref("");

const tableData = computed(() => {
  return data.value.filter(
    (item) =>
      search.value ||
      item.post.title.toLowerCase().includes(search.value.toLowerCase())
  );
});
const loadData = () => {
  getAll().then((res) => (data.value = res.data));
};
const cancelFeatured = (index, item) => {
  ElMessageBox.confirm("你确定吗?", "Are you sure?", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      deleteItem(item.id).then((res) => {
        ElMessage({
          type: "warning",
          message: `操作成功。${res.message}`,
        });
      }).catch(() => {
      ElMessage({
        type: "error",
        message: `操作失败。${res.message}`,
      });
    });;
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: `操作取消`,
      });
    });
};

loadData()
</script>

<style scoped>
</style>
