<template>
  <el-container>
    <el-header height="60px">
      <div>
        <el-button 
        style="background-color: #316C72FF;color:#FFF;height: 34px;line-height: 34px;"
        @click="addPost">
            <el-icon class="el-icon--left">
              <i class="fa fa-plus"></i>
            </el-icon>
            新建文章
          </el-button>
          <el-button type="danger" :disabled="!hasSelection">删除</el-button>
          <el-button @click="toggleSelection()" :disabled="!hasSelection">取消选择</el-button>
        </div>
    </el-header>
    <el-header height="30px">
      <el-row type="flex" justify="space-between">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input v-model="search"
                placeholder="请输入关键字"></el-input>
          </el-col>
          <el-col :span="10">
            <!-- 分类筛选 -->
            <!-- 为el-select添加filterable属性即可启用搜索功能。默认情况下，Select 会找出所有label属性包含输入值的选项。 -->
            <el-select v-model="currentCategoryName" clearable filterable placeholder="请选择分类" v-on:change="handleCategoryChange">
              <el-option
                v-for="item in categories"
                :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-col>
        </el-row>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        ref="table"
        :data="filterTableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort="{prop: 'lastUpdateTime',order:'descending'}">
        <el-table-column
          type="selection"
          width="30"/>
        <el-table-column
          prop="id"
          label="ID"
          width="150"/>
        <el-table-column
          prop="title"
          label="标题"
          sortable
          :show-overflow-tooltip="true"
          width="250"/>
        <el-table-column
          prop="creationTime"
          label="创建时间"
          sortable
          width="180"/>
        <el-table-column
          prop="lastUpdateTime"
          label="上次更新"
          sortable
          width="180"/>
        <el-table-column
          prop="categories.name"
          label="分类"/>
        <el-table-column
        prop="viewCount"
        label="浏览量"/>
        <el-table-column
          fixed="right"
          label="操作"
          width="230">
          <template #default="scope">
            <el-button type="info" @click="onItemEditClick(scope.row)">编辑</el-button>
            <el-button type="danger" @click="onItemDeleteClick(scope.row)">删除</el-button>
            <el-dropdown @command="cmd=>onItemDropdownClick(scope.row,cmd)" style="margin-left:10px">
              <el-button type="primary">
                更多
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                <el-dropdown-item command="setFeatured">设置推荐</el-dropdown-item>
                <el-dropdown-item command="cancelFeatured">取消推荐</el-dropdown-item>
                <el-dropdown-item command="setTop">设置置顶</el-dropdown-item>
              </el-dropdown-menu>
              </template>
            </el-dropdown>
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
  </el-container>
</template>

<script setup lang=ts>
import {ref,computed} from 'vue'
import {getAll} from '../../http/modules/category'
import {getList,deleteItem,setFeatured,cancelFeatured,setTop} from '../../http/modules/blogPost'
import { ElMessageBox,ElMessage } from "element-plus";
import formatTime from '../../utils/dateTime';
import { useRoute,useRouter } from "vue-router";

const router = useRouter()

const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(1000)
const search = ref('')
const sortBy = ref(null)
const posts = ref()
posts.value = []
const categories = ref()
categories.value = []
const currentCategoryId = ref()
const currentCategoryName = ref("")
const selectedPosts = ref()
selectedPosts.value = []
const hasSelection = ref(false)

const loadCategories = ()=>{
    getAll().then(res => {
        let categorie = [{id: 0, name: '全部'}]
        categorie = categorie.concat(res.data)
        categories.value = categorie
      }).catch(res => ElMessage.error(`加载分类列表出错：${res.message}`))
}
const loadBlogPosts = ()=>{
  const format = 'yyyy-MM-dd HH:mm:ss';
    getList(
        false, "",
        currentCategoryId.value, search.value, sortBy.value,
        currentPage.value, pageSize.value
      ).then(res => {
        console.log(res)
        totalCount.value = res.pagination.totalItemCount
        posts.value = res.data
        posts.value.forEach(item => {
          item.creationTime = formatTime(item.creationTime,format)
          item.lastUpdateTime = formatTime(item.lastUpdateTime,format)
        })
      }).catch(res => ElMessage.error(`获取文章列表出错：${res.message}`))
}

//添加文章按钮
const addPost = ()=>{
    router.push('/post/new')
}
//查看按钮
const onItemEditClick = (post)=>{
   router.push(`/post/edit/${post.id}`)
}
//删除
const onItemDeleteClick = (post) =>{
    ElMessageBox.confirm("此操作将永久删除该文章, 是否继续?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(()=>{
        deleteItem(post.id)
      .then(res => ElMessage.success(`操作成功。${res.message}`))
      .catch(res => ElMessage.error(`操作失败。${res.message}`))
        .finally(() => loadBlogPosts())
  }).catch(() => ElMessage.warning('操作取消'))
}
const filterTableData = computed(() =>
  posts.value.filter(
    (data) =>
      (!search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase())) &&
      (!currentCategoryName.value || data.categoryId == currentCategoryName.value)
  )
)
    // 下拉菜单点击
const onItemDropdownClick = (post,command)=>{
 switch (command) {
        case 'setFeatured':
          setFeatured(post.id)
            .then(res => ElMessage.success('设置推荐成功'))
            .catch(res => ElMessage.error(`操作失败。${res.message}`))
          break
        case 'cancelFeatured':
          cancelFeatured(post.id)
            .then(res => ElMessage.success('取消推荐成功'))
            .catch(res => ElMessage.error(`操作失败。${res.message}`))
          break
        case 'setTop':
          setTop(post.id)
            .then(res => ElMessage.success(`设置置顶成功。${res.message}`))
            .catch(res => ElMessage.error(`设置置顶失败。${res.message}`))
          break
      }
}

const handleCategoryChange = (categoryId)=>{
  currentCategoryId.value = categoryId
}
const handlePageSizeChange = (p) =>{
  pageSize.value = p
  loadBlogPosts()
}
const handleCurrentPageChange = (page) =>{
      currentPage.value = page
      loadBlogPosts()
}

loadCategories()
loadBlogPosts()
</script>

<style>
.el-header {
  text-align: left;
}
</style>
