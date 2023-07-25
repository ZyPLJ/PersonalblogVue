<template>
  <el-table :data="tableData" :height="800" style="width: 100%">
    <el-table-column prop="id" label="ID" width="50"> </el-table-column>
    <el-table-column prop="post.id" label="文章ID" width="150">
    </el-table-column>
    <el-table-column prop="post.categories.name" label="文章分类" width="250">
    </el-table-column>
    <el-table-column prop="post.title" label="文章标题" width="250" :show-overflow-tooltip="true">
    </el-table-column>
    <el-table-column prop="sortOrder" label="排序" width="300" :show-overflow-tooltip="true">
      <template #default="scope">
      <el-input-number
        v-model="tableData[scope.$index].sortOrder"
        :disabled="Show"
        :min="1"
        :max="999"
        controls-position="right"
        size="large"
        @change="handleChange(scope.$index,scope.row)"
      />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="mini" type="warning" plain @click="cancelFeatured(scope.$index, scope.row)">取消推荐
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang=ts>
import { ref, computed } from "vue";
import { getAll, deleteItem,updateSort } from "../../http/modules/featuredPost";
import { ElMessage, ElMessageBox } from "element-plus";

const Show = ref(false)
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
          type: "success",
          message: `操作成功。${res.message}`,
        });
        loadData()
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

const handleChange = async (index,item) => {
  console.log(index+" "+item.id + " " + item.sortOrder)
  Show.value = true
  try {
    var res = (await updateSort(item.id,item.sortOrder))
    if(res.statusCode === 200){
      ElMessage.success(`${res.message}`)
    }else{
      ElMessage.error(`${res.message}`)
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      ElMessage.error(`${error.response.data.message}`);
    } else {
      ElMessage.error("发生错误，请重试");
    }
  } finally {
    Show.value = false;
  }
}

loadData()
</script>

<style scoped></style>
