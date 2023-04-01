<template>
  <el-row v-if="featuredPhotos.length>0" :gutter="10">
    <el-col :span="4" v-for="fp in featuredPhotos" :key="fp.id">
      <el-card :body-style="{ padding: '0px' }">
        <el-image :src="fp.photo.url" class="image" alt="" :preview-src-list="[fp.photo.url]"></el-image>
        <div style="padding: 14px;">
          <div>图片标题：{{ fp.photo.title }}</div>
          <div>拍摄地点：{{ fp.photo.location }}</div>
          <div style="margin-top: 3px;">
            <time class="time">{{ fp.photo.dateTimeStr }}</time>
          </div>
          <div class="bottom clearfix" style="margin-top: 3px;">
            <el-button-group>
              <el-button type="info" icon="el-icon-warning-outline" plain @click="notImpl"></el-button>
              <el-button type="primary" icon="el-icon-edit" plain @click="notImpl"></el-button>
              <el-button type="danger" icon="el-icon-delete" plain @click="dItem(fp)"></el-button>
            </el-button-group>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-empty v-else description="推荐图片"></el-empty>
</template>

<script setup lang=ts>
import { get } from '@/http/modules/auth';
import {ref} from 'vue'
import { getAll,deleteItem } from "../../http/modules/featuredPhoto";
import { getAll as gethost } from "../../http/modules/config"
import { ElMessage,ElMessageBox  } from "element-plus";

const featuredPhotos = ref()
featuredPhotos.value = []
const host = ref()
host.value = []


const loadData = ()=>{
   gethost()
    .then((res) => (host.value = res.data))
    .catch((res) => ElMessage.error(`获取配置列表出错：${res.message}`));
    getAll().then(res=>{
      featuredPhotos.value = res.data
      featuredPhotos.value.forEach(item => {
        item.photo.url = host.value[0]?.value + `/media/photofraphy/${item.photo.id}.jpg`
         let dt = new Date(item.photo.createTime)
          item.photo.dateTimeStr = `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`
      });
    })
}
const notImpl = ()=>{
  ElMessage.warning("还没实现~")
}
const dItem = (featuredPhoto)=>{
ElMessageBox.confirm(
    '此操作将删除这个推荐图片, 是否继续?',
    '提示',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(()=>{
      deleteItem(featuredPhoto.id)
      .then(res => ElMessage.success(`删除成功。${res.message}`))
      .catch(res => ElMessage.error(`操作失败。${res.message}`))
            .finally(() => loadData())
  }).catch(() => ElMessage('已取消删除'))
}

loadData()
</script>

<style scoped>

</style>
