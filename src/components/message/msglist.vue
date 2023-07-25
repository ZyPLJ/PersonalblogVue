<template>
    <el-table :data="filteredData" style="width: 100%">
      <el-table-column label="主键" prop="id" />
      <el-table-column label="留言者" prop="name" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="留言内容" prop="message" />
      <el-table-column label="留言时间" prop="created_at" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  </template>
  
  <script lang="ts" setup>
  import { ref, computed,defineExpose } from 'vue'
  import { getList,delteMsg } from "../../http/modules/message"
  import { ElMessage, ElMessageBox } from 'element-plus'
  import formatTime from '../../utils/dateTime';
  
  const data = ref();
  const currentPage = ref(1);
  const pageSize = ref(15);
  const totalCount = ref(1000);
  const search = ref('')
  
  const handleDelete = async (index: number, row) => {
    console.log(index, row.id)
    ElMessageBox.confirm(
    '确定删除这条留言吗?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async () => {
        const res = (await delteMsg(row.id))
        if(res.statusCode == 200){
            ElMessage.success(res.message)
        }else{
            ElMessage.error(res.message)
        }
        load()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })

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
    const format = 'yyyy-MM-dd HH:mm:ss';
    const res = await getList(currentPage.value, pageSize.value);
    console.log(res.data);
    data.value = res.data.map((item) => {
      return {
        ...item,
        created_at: formatTime(item.created_at, format), // 更新created_at属性为格式化后的时间字符串
      };
    });
    totalCount.value = res.pagination.totalItemCount;
  };
  
  const filteredData = computed(() => {
    if (search.value) {
      return data.value.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.value.toLowerCase()) ||
          item.message.toLowerCase().includes(search.value.toLowerCase())
        );
      });
    } else {
      return data.value;
    }
  });
  
  load();
  defineExpose({load})
  </script>