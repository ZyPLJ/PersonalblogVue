<template>
    <el-container>
        <el-header height="120px">
            <div>
                <el-button style="background-color: #316C72FF;color:#FFF;height: 34px;line-height: 34px;" @click="onItemAddClick()">
                    <el-icon class="el-icon--left">
                        <i class="fa fa-plus"></i>
                    </el-icon>
                    新增标签
                </el-button>
                <!-- <el-button type="danger" :disabled="!hasSelection">批量删除</el-button> -->
            </div>
            <el-card shadow="always"  style="margin-top: 20px;">
            <el-row>
                <el-col :span="6">
                    <el-input v-model="search" placeholder="请输入关键字"></el-input>
                </el-col>
            </el-row>
        </el-card>
        </el-header>
        <el-main>
            <el-table
        ref="table"
        :data="Tags"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="30"/>
        <el-table-column
          prop="id"
          label="ID"
          width="150"/>
        <el-table-column label="标签">
            <template #default="scope">
                <el-tag>{{ scope.row.name }}</el-tag>
            </template>
      </el-table-column>
      <el-table-column label="文章量" prop="postCount">
      </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="230">
          <template #default="scope">
            <el-button type="info" @click="onItemEditClick(scope.row)">编辑</el-button>
            <el-button type="danger" @click="onItemDeleteClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        </el-main>
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
        :total="totalCount">
      </el-pagination>
    </el-footer>
        <AddTagDialog ref="addTagDialog" :load="loadTags"/>
    </el-container>
</template>
<script setup lang="ts">
import { ref,computed,watch} from 'vue'
import Tag from '../../components/Tag.vue';
import { getList,DelTag } from "../../http/modules/Tag";
import { ElMessageBox,ElMessage  } from "element-plus";
import AddTagDialog from "./AddTagDialog.vue";

const search = ref('')
const hasSelection = ref(false)
const Tags = ref([])
const addTagDialog = ref();

const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(1000)
const TagId = ref(null)
const sortBy = ref(null)
const currentCategoryId = ref()

const onItemEditClick = (Tag) => {
  addTagDialog.value.show(Tag,'edit');
};
const onItemAddClick = ()=>{
  addTagDialog.value.show("",'add');
}

const loadTags = async() =>{
  const response = await getList(false, "",
        currentCategoryId.value, search.value, sortBy.value,TagId.value,
        currentPage.value, pageSize.value)
  Tags.value = response.data
  totalCount.value = response.pagination.totalItemCount
}

//删除
const onItemDeleteClick = (Tag) =>{
    ElMessageBox.confirm("此操作将永久删除该标签和标签下所有文章, 是否继续?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(()=>{
        DelTag(Tag.id)
      .then(res => ElMessage.success(`操作成功。${res.message}`))
      .catch(res => ElMessage.error(`操作失败。${res.message}`))
        .finally(() => loadTags())
  }).catch(() => ElMessage.warning('操作取消'))
}

const handlePageSizeChange = (p) =>{
  pageSize.value = p
  loadTags()
}

const handleCurrentPageChange = (page) =>{
    currentPage.value = page
    loadTags()
}

watch(search, () => {
  currentPage.value = 1; // 重置当前页数为1
  loadTags();
});

loadTags()
</script>