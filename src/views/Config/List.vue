<template>
  <el-container>
    <el-header height="30px">
      <el-row type="flex" justify="start">
        <div>
          <el-button @click="handleAdd">添加</el-button>
          <AddConfigDialog
            ref="addConfigDialog"
            @onAddSucceed="onAddSucceed"
            @onUpdateSucceed="onUpdateSucceed"
          ></AddConfigDialog>
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
        :default-sort="{ prop: 'time', order: 'descending' }"
      >
        <el-table-column type="selection" width="30" />
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="key" label="key" :show-overflow-tooltip="true" />
        <el-table-column
          prop="value"
          label="value"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="description"
          label="description"
          :show-overflow-tooltip="true"
        />
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-link type="info" @click="onItemEditClick(scope.row)"
              >编辑</el-link
            >
            <el-link type="danger" @click="onItemDeleteClick(scope.row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang=ts>
import AddConfigDialog from "../Config/AddDialog.vue";
import { ref } from "vue";
import { getAll } from "../../http/modules/config";
import { ElMessage } from "element-plus";

const addConfigDialog = ref();
const data = ref();
data.value = [];

const loadData = () => {
  getAll()
    .then((res) => (data.value = res.data))
    .catch((res) => ElMessage.error(`获取配置列表出错：${res.message}`));
};

const handleAdd = ()=>{
  addConfigDialog.value.show()
}

loadData()
</script>
<style scoped>
</style>
