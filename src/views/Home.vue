<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="4">
        <!--阅读总量-->
        <el-card v-loading="loading">
          <div slot="header">阅读总量</div>
          <h1>{{ visitRecordOverview.totalVisit }}</h1>
          <div>
            今日
            <i class="el-icon-top text-primary"></i>
            {{ visitRecordOverview.todayVisit }}
          </div>
        </el-card>
        <!--新的创作-->
        <el-card class="mt-2 el-coltop">
          <div slot="header">新的创作</div>
          <el-row>
            <el-col :span="24">
              <el-button
                type="warning"
                plain
                class="w-100"
                @click="router.push('/post/list')"
              >
                <div class="mt-2">博客文章</div>
              </el-button>
            </el-col>
            <el-col :span="24">
              <el-button
                type="primary"
                plain
                class="w-100"
                @click="$router.push('/post/category/list')"
              >
                <div class="mt-2">文章分类</div>
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button
                type="primary"
                plain
                class="w-100"
                @click="$router.push('/photo/list')"
              >
                <div class="mt-2">摄影作品</div>
              </el-button>
            </el-col>
            <el-col :span="24">
              <el-button type="primary" plain class="w-100" @click="notImpl">
                <div class="mt-2">代码片段</div>
              </el-button>
            </el-col>
          </el-row>
        </el-card>
        <!--快捷操作-->
        <el-card class="mt-2">
          <div slot="header">快捷操作</div>
        
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-row :gutter="8" v-loading="loading">
          <el-col :span="4">
            <el-card>
              <div slot="header">文章数量</div>
              <h1>{{ overviewdata.ovderdata['postsCount'] }}</h1>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">分类数量</div>
              <h1>{{ overviewdata.ovderdata["categoriesCount"] }}</h1>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">照片数量</div>
              <h1>{{ overviewdata.ovderdata["photosCount"] }}</h1>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">推荐文章</div>
              <h1>{{ overviewdata.ovderdata["featuredPostsCount"] }}</h1>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">推荐分类</div>
              <h1>{{ overviewdata.ovderdata["featuredCategoriesCount"] }}</h1>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">推荐图片</div>
              <h1>{{ overviewdata.ovderdata["featuredPhotosCount"] }}</h1>
            </el-card>
          </el-col>
        </el-row>
        <el-card class="mt-2" v-loading="loading">
          <div slot="header">数据趋势</div>
          <div ref="main" style="width: 100%; height: 400px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang=ts>
import { ref, computed } from "vue";
import { getOverview, getTrend } from "../http/modules/visitRecord";
import { overview } from "../http/modules/blog";
import * as echarts from "echarts";
import {useRouter} from 'vue-router'

const main = ref();
const router = useRouter();

const overviewdata = ref();
overviewdata.value = {
  ovderdata:{}
}
const visitRecordOverview = ref();
visitRecordOverview.value = {
  totalVisit:"",
  todayVisit:""
}
const trend = ref(null);
const loadStage = ref();
loadStage.value = 0;

const loading = computed(() => {
  return loadStage.value < 3;
});

const load = async() => {
    let res = (await overview()).data;
    overviewdata.value.ovderdata = res;
    loadStage.value++;
    let res1 = (await getOverview()).data;
    visitRecordOverview.value.totalVisit = res1[0].totalVisit;
    visitRecordOverview.value.todayVisit = res1[0].todayVisit;
    loadStage.value++;
    let res2 = (await getTrend(14)).data;
    trend.value = null;
    trend.value = res2;
    loadStage.value++;
    console.log(res)
    console.log(res1[0])
      console.log(res2)
      change();
};

// 基本柱形图
const change = () => {
  var myChart = echarts.init(main.value);
  if (trend.value != null && trend.value != undefined){
    const option = {
      xAxis: {
          type:'category',
          name: "日期",
          data: trend.value.map((item) => item.date),
        },
        yAxis: {
          name: "阅读量",
          type: "value",
        },
        series: [
          {
            data: trend.value.map((item) => item.count),
            type: "line",
            stack: 'Total',
            areaStyle: {
              color: 'rgba(55, 162, 218, 0.6)' // 设置浅蓝色
            },
            emphasis: {
              focus: 'series'
            },
            smooth: true,
            label: {
              show: true,
              formatter: function(params) {
                return params.value + ' 次'; // 在数值后面添加“次”字符串
              },
            },
          },
        ],
  } 
  myChart.setOption(option);
}
};



load();
</script>

<style>
.icon-lg {
  font-size: 40px !important;
}
.el-coltop .el-col{
  margin-top: 10px; /* 设置上下间距为10像素 */
}

</style>
