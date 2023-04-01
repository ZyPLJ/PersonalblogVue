<template>
  <div class="menu-bar-container">
    <!-- logo -->
    <div
      class="logo"
      :style="{ background: themeColor, display: fullscreen ? 'none' : '' }"
      :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'"
      @click="router.push('/')"
    >
      <img v-if="collapse" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp.qqan.com%2Fup%2F2022-12%2F20221221511295206.png&refer=http%3A%2F%2Fp.qqan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672579733&t=4f3c701886041ed13fca7f44a39e71cc" />
      <div>{{ collapse ? "" : appName }}</div>
    </div>
    <!-- 导航菜单 -->
    <el-menu
      ref="navMenu"
      :style="{ display: fullscreen ? 'none' : '' }"
      :default-active="route.path"
      :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'"
      :collapse="collapse"
      :collapse-transition="false"
      :unique-opened="false"
      router
    >
      <el-menu-item index="/">
        <i class="fa fa-home"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-sub-menu index="blog">
        <template #title>
          <i class="fa fa-map-marker"></i>
          <span>博客</span>
        </template>
        <el-menu-item-group title="分类管理">
          <el-menu-item index="/category/list">分类列表</el-menu-item>
          <el-menu-item index="/category/featured">推荐分类</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="文章管理">
          <el-menu-item index="/post/list">文章列表</el-menu-item>
          <el-menu-item index="/post/featured">推荐文章</el-menu-item>
          <el-menu-item index="/post/top">置顶文章</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="黑科技">
          <el-menu-item index="/post/upload">打包上传</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="photography">
        <template #title>
          <i class="fa fa-camera-retro"></i>
          <span>摄影</span>
        </template>
        <el-menu-item-group title="照片管理">
          <el-menu-item index="/photo/list">照片列表</el-menu-item>
          <el-menu-item index="/photo/featured">推荐图片</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="/visit_record/list">
        <i class="el-icon-menu"></i>
        <span slot="title">访问日志</span>
      </el-menu-item>
      <el-menu-item index="/config/list">
        <i class="el-icon-s-tools"></i>
        <span slot="title">配置中心</span>
      </el-menu-item>
      <el-menu-item index="/link/list">
        <i class="el-icon-link"></i>
        <span slot="title">友情链接管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang='ts'>
import { mapState, useStore } from "vuex";
import { computed, watch,ref,toRaw } from "vue";
import { useRoute,useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();
const navMenu = ref(null);

const appName = computed(()=>store.state.app.appName)
const themeColor = computed(()=>store.state.app.themeColor)
const collapse = computed(()=>store.state.app.collapse)
const fullscreen = computed(()=>store.state.app.fullscreen)

// computed(() => {
//   mapState({
//     appName:store.state.app.appName,
//     themeColor:store.state.app.themeColor,
//     collapse:store.state.app.collapse,
//     fullscreen:store.state.app.fullscreen,
//   });
// });
let mainTabs = computed({
  get: () => {
    return store.state.tab.mainTabs;
  },
  set: (val) => {
    store.commit("updateMainTabs", val);
  },
});

let mainTabsActiveName = computed({
  get: () => {
    return store.state.tab.mainTabsActiveName;
  },
  set: (val) => {
    store.commit("updateMainTabsActiveName", val);
  },
});

watch(() => 
    route.path,
    (toPath) => {
      //要执行的方法
      handleRoute(route)
    })

const handleRoute = (route)=>{
  // tab标签页选中, 如果不存在则先添加
      let tab = toRaw(mainTabs.value).filter(item => item.name === route.name)[0]
      if (!tab) {
        tab = {
          name: route.name,
          title: route.name,
          // icon: route.meta.icon,
          fullPath: route.fullPath,
          path: route.path,
          params: route.params,
          query: route.query
        }
        mainTabs.value = mainTabs.value.concat(tab)
      }
      mainTabsActiveName.value = tab.name
      console.log(mainTabs.value)
      // 切换标签页时同步更新高亮菜单
      // if (navMenu.value != null) {
      //   console.log(toRaw(navMenu.activeIndex))
      //   // navMenu.value.activeIndex = '' + route.meta.index
      //   // navMenu.value.initOpenedMenu()
      // }
}

handleRoute(route)
</script>

<style lang="scss" scoped>
.menu-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1020;

  .el-menu {
    position: absolute;
    top: 60px;
    bottom: 0;
    text-align: left;
  }

  .logo {
    position: absolute;
    top: 0;
    height: 60px;
    line-height: 60px;
    background: #545c64;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 0;
      margin: 10px 10px 10px 10px;
      float: left;
    }

    div {
      font-size: 22px;
      color: white;
      text-align: left;
      padding-left: 20px;
    }
  }

  .menu-bar-width {
    width: 200px;
  }

  .menu-bar-collapse-width {
    width: 65px;
  }
}
</style>
