<template>
  <el-container>
    <el-header height="30px">
      <el-row type="flex" justify="start">
        <div>
          <el-button @click="ShowDlog">添加</el-button>
          <!-- <el-button type="danger">批量删除</el-button> -->
        </div>
      </el-row>
    </el-header>
    <el-main>
      <Waterfall
        :list="photos"
        :breakpoints="{
          1200: { rowPerView: 4 },
          800: { rowPerView: 3 },
          500: { rowPerView: 2 },
        }"
      >
        <template #item="{ item }">
          <el-card :body-style="{ padding: '0px' }">
            <LazyImg :url="item.url + '?t=' + Math.random()" :height="item.height" :width="item.width"/>
          </el-card>
          <PhotoCard :photo="item" v-on:onItemDeleted="loadPhotos"></PhotoCard>
        </template>
      </Waterfall>
      <!-- <Waterfall align="center"
                 :line-gap="300" :min-line-gap="250" :max-line-gap="400" :watch="photos">
        <waterfall-slot v-for="(photo,index) in photos"
                        :height="photo.height" :width="photo.width"
                        :order="index" :key="photo.id" move-class="item-move">
          <PhotoCard :photo="photo" v-on:onItemDeleted="loadPhotos"></PhotoCard>
        </waterfall-slot>
      </Waterfall> -->
      <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData">

      </vue-waterfall-easy>
      <AddPhotoDialog
        ref="addPhotoDialog"
        @onAddPhotoSucceed="onAddPhotoSucceed"
      ></AddPhotoDialog>
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
        :total="totalCount"
      >
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script setup lang=ts>
import AddPhotoDialog from "../Photography/AddPhotoDialog.vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/style.css";
import PhotoCard from "../../components/PhotoCard/index.vue";
import { ref,unref  } from "vue";
import { getList } from "../../http/modules/photo";
import { getAll } from "../../http/modules/config"
import { ElMessage } from "element-plus";
// import {baseUrl} from "../../utils/global"

const addPhotoDialog = ref();
const currentPage = ref(1);
const pageSize = ref(20);
const totalCount = ref(1000);
const photos = ref();
const host = ref()
photos.value = [];
host.value = []


const loadPhotos = () => {
  getAll()
    .then((res) => (host.value = res.data))
    .catch((res) => ElMessage.error(`获取配置列表出错：${res.message}`));
  getList(currentPage.value, pageSize.value).then((res) => {
    totalCount.value = res.pagination.totalItemCount;
    photos.value = res.data.map((item) => ({
      ...item,
      //这是后台项目的路径
      url: host.value[0]?.value +'/media/' + item.yPath
      // url:'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF'
    }));
  });
};
const handlePageSizeChange = (pageSize) => {
  pageSize.value = pageSize;
  loadPhotos();
};
const handleCurrentPageChange = (page) => {
  currentPage.value = page;
  loadPhotos();
};
const onAddPhotoSucceed = () => {
  ElMessage.success("添加成功");
  loadPhotos();
};
const ShowDlog = () => {
  console.log("12123123");
  addPhotoDialog.value.show();
};
loadPhotos();
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
