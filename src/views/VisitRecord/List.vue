<template>
  <el-container>
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
        <el-table-column prop="ip" label="IP地址" width="100" />
        <el-table-column
          prop="requestPath"
          label="请求地址"
          sortable
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="requestQueryString"
          label="query参数"
          width="200"
        />
        <el-table-column
          prop="requestMethod"
          label="HTTP方法"
          sortable
          width="150"
        />
        <el-table-column
          prop="userAgent"
          label="UA信息"
          sortable
          :show-overflow-tooltip="true"
          width="500"
        />
        <el-table-column prop="timeStr" label="时间" sortable width="400" />
      </el-table>
    </el-main>
    <el-footer>
      <el-footer height="30px">
        <!-- 分页 -->
        <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentPageChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 40, 60, 80, 100]"
          :page-size="pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </el-footer>
    </el-footer>
  </el-container>
</template>

<script setup lang=ts>
import { ref } from "vue";
import { getList } from "../../http/modules/visitRecord";
import { ElMessage } from "element-plus";
import formatTime from '../../utils/dateTime';

const currentPage = ref(1);
const pageSize = ref(20);
const totalCount = ref(1000);
const search = ref("");
const sortby = ref(null);
const data = ref();
data.value = [];

const loadVisitRecord = () => {
  const format = 'yyyy-MM-dd HH:mm:ss';
  getList(currentPage.value, pageSize.value)
    .then((res) => {
      console.log(res);
      totalCount.value = res.pagination.totalItemCount;
      data.value = res.data;
      data.value.forEach((item) => {
        item.timeStr = formatTime(item.time,format)
      });
    })
    .catch((res) => ElMessage.error(`获取访问记录列表出错：${res.message}`));
};

const handlePageSizeChange = (pageSize) => {
  pageSize.value = pageSize;
  loadVisitRecord();
};
const handleCurrentPageChange = (page) => {
  currentPage.value = page;
  loadVisitRecord();
};
loadVisitRecord()
</script>

<style scoped>
</style>
