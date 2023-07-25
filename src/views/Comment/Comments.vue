<template>
  <el-container>
    <el-header height="60px" style="display: flex; justify-content: flex-end;">
      <el-button 
      :disabled="isUse"
      type="danger" 
      style="height: 34px; line-height: 34px;"
      @click="RangeDelete">
        <el-icon class="el-icon--left">
          <i class="fa fa-trash"></i>
        </el-icon>
        批量删除
      </el-button>
    </el-header>
    <el-main>
      <el-table :data="data" style="width: 100%" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="头像" width="100">
          <template #default="scope">
            <el-avatar :size="60">
              <img :src="scope.row.avatar" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="文章ID" prop="postId" />
        <el-table-column label="评论者名称" prop="anonymousUser.name" />
        <el-table-column label="回复对象">
          <template #default="scope">
            {{ scope.row.parent?.anonymousUser?.name ? scope.row.parent?.anonymousUser?.name : '无' }}
          </template>
        </el-table-column>
        <el-table-column label="邮箱" prop="anonymousUser.email" />
        <el-table-column label="内容" prop="content" />
        <el-table-column label="评论时间" prop="createdTime" sortable />
        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
  <el-footer height="30px" style="margin-top: 20px;">
    <!-- 分页 -->
    <el-pagination @size-change="handlePageSizeChange" @current-change="handleCurrentPageChange"
      :current-page="currentPage" :page-sizes="[10, 20, 40, 60, 80, 100]" :page-size="pageSize" background
      layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
    </el-pagination>
  </el-footer>
</template>
  
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { getList, getListsearch, delteComment,RangeDel } from "../../http/modules/comment"
import { ElMessage } from 'element-plus'
import formatTime from '../../utils/dateTime';

const data = ref();
const currentPage = ref(1);
const pageSize = ref(20);
const totalCount = ref(1000);
const search = ref('')
const delRange = ref(null)
const isUse = ref(true)
 
watch(
  () => search.value,
  async (newvalue, oldvalue) => {
    if (newvalue != oldvalue) {
      search.value = newvalue;
    }
    var res = await getListsearch(currentPage.value, pageSize.value, search.value)
    handleData(res)
  }
);

const handleDelete = async (index: number, row) => {
  console.log(index, row)
  var res = await delteComment(row)
  if (res.statusCode == 200) {
    ElMessage.success(res.message)
  } else {
    ElMessage.error(res.message)
  }
  load()
}

const handlePageSizeChange = (pageSize) => {
  pageSize.value = pageSize;
  load()
};
const handleCurrentPageChange = (page) => {
  currentPage.value = page;
  load()
};

const load = async () => {
  const res = await getList(currentPage.value, pageSize.value);
  handleData(res)
  console.log(data.value)
  totalCount.value = res.pagination.totalItemCount;
};

const handleData = async (res) => {
  const format = 'yyyy-MM-dd HH:mm:ss';
  data.value = res.data.map((item) => {
    let s = {
      ...item,
      createdTime: formatTime(item.createdTime, format),
      avatar: `http://q2.qlogo.cn/headimg_dl?dst_uin=${item.anonymousUser.email.split('@')[0]}&spec=100`
    };
    return s
  });
}

const handleSelectionChange = (val) => {
  delRange.value = val
  isUse.value = val.length > 0 ? false : true
}

const RangeDelete = async () => {
  if (delRange.value !== null) {
    const idList = delRange.value.map((item: { id: string }) => item.id);
    const res = await RangeDel(JSON.stringify(idList)); // 将 idList 转换为 JSON 格式的字符串
    if (res.statusCode == 200) {
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message);
    }
    load()
  }
};
load();
</script>
  