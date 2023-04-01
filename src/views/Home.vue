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
        <el-card class="mt-2">
          <div slot="header">新的创作</div>
          <el-row :gutter="8">
            <el-col :span="12">
              <el-button
                type="warning"
                plain
                class="w-100"
                @click="router.push('/post/new')"
              >
                <!-- <div><i class="icon-lg fa fa-address-book-o"></i></div> -->
                <div class="mt-2">博客文章</div>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                type="primary"
                plain
                class="w-100"
                @click="$router.push('/category/list')"
              >
                <!-- <div><i class="icon-lg fa fa-folder-o"></i></div> -->
                <div class="mt-2">文章分类</div>
              </el-button>
            </el-col>
          </el-row>
          <el-row :gutter="8" class="mt-2">
            <el-col :span="12">
              <el-button
                type="primary"
                plain
                class="w-100"
                @click="$router.push('/photo/list')"
              >
                <!-- <div><i class="icon-lg fa fa-file-picture-o"></i></div> -->
                <div class="mt-2">摄影作品</div>
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" plain class="w-100" @click="notImpl">
                <!-- <div><i class="icon-lg fa fa-code"></i></div> -->
                <div class="mt-2">代码片段</div>
              </el-button>
            </el-col>
          </el-row>
        </el-card>
        <!--快捷操作-->
        <el-card class="mt-2">
          <div slot="header">快捷操作</div>
          <div>
            <el-button type="info" plain class="w-100" @click="notImpl"
              >批量导入文章</el-button
            >
          </div>
          <div class="mt-2">
            <el-button
              type="info"
              plain
              class="w-100"
              @click="$router.push('post/upload')"
              >上传文章</el-button
            >
          </div>
          <div class="mt-2">
            <el-button type="info" plain class="w-100" @click="notImpl"
              >批量导入图片</el-button
            >
          </div>
          <div class="mt-2">
            <el-button
              type="info"
              plain
              class="w-100"
              @click="$router.push('/photo/list')"
              >上传图片</el-button
            >
          </div>
          <div class="mt-2">
            <el-button type="info" plain class="w-100" @click="notImpl"
              >导出数据</el-button
            >
          </div>
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
          <dv-charts
            class="mt-2"
            :style="'height: 550px'"
            :option="trendChartOption"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang=ts>
import { ref, computed } from "vue";
import { getOverview, getTrend } from "../http/modules/visitRecord";
import { overview } from "../http/modules/blog";
import { ElMessage } from "element-plus";

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

const trendChartOption = computed(() => {
  let data = {};
  if (trend.value != null && trend.value != undefined) {
    data = {
      xAxis: {
        name: "日期",
        data: trend.value.map((item) => item.date),
        nameTextStyle: {
          fill: "#333",
          fontSize: 20,
        },
        axisLabel: {
          style: {
            fill: "#333",
            fontSize: 16,
            rotate: 0,
          },
        },
      },
      yAxis: {
        name: "阅读量",
        data: "value",
        nameTextStyle: {
          fill: "#333",
          fontSize: 20,
        },
        axisLabel: {
          style: {
            fill: "#333",
            fontSize: 16,
            rotate: 0,
          },
        },
      },
      series: [
        {
          data: trend.value.map((item) => item.count),
          type: "line",
          smooth: true,
          lineArea: {
            show: true,
            gradient: ["rgba(55, 162, 218, 0.6)", "rgba(55, 162, 218, 0)"],
          },
          label: {
            show: true,
            formatter: "{value} 次",
          },
        },
      ],
    };
  }
  return data;
});
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
};
load();
</script>

<style>
.icon-lg {
  font-size: 40px !important;
}
</style>
