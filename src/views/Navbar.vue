<template>
  <div class="menu-bar-container">
    <!-- logo -->
    <!-- 导航菜单 -->
    <el-scrollbar>
      <el-menu
    ref="navMenu"
    :collapse="collapse"
    :collapse-transition="false"
    :unique-opened="false"
    default-active="/"
    router
  >
    <el-menu-item style="border-bottom:1px solid gainsboro;
    height: 60px;;line-height: 60px;">
      <div
        class="logo"
        @click="router.push('/')"
      >
        <img v-if="collapse" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp.qqan.com%2Fup%2F2022-12%2F20221221511295206.png&refer=http%3A%2F%2Fp.qqan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672579733&t=4f3c701886041ed13fca7f44a39e71cc" />
        <div style="margin-left:25px;color: #316c72;">{{ collapse ? "" : appName }}</div>
      </div>
    </el-menu-item>
    <el-menu-item index="/">
      <el-icon :size="15"><i class="fa fa-home fa-lg"></i></el-icon>
      <span slot="title">主页</span>
    </el-menu-item>
    <el-sub-menu index="post" :route="{ meta: { breadcrumbName: '博客' } }">
      <template #title>
        <el-icon :size="15"><i class="fa fa-file-text"></i></el-icon>
        <span>博客</span>
      </template>
      <el-menu-item index="/post/category/list">
        <el-icon :size="15"><i class="fa fa-th-large"></i></el-icon>
        <span slot="title">分类列表</span>
      </el-menu-item>
      <el-menu-item index="/post/category/featured">
        <el-icon :size="15"><i class="fa fa-star fa-lg"></i></el-icon>
        <span slot="title">推荐分类</span>
      </el-menu-item>
      <el-menu-item index="/post/list">
        <el-icon :size="15"><i class="fa fa-list-ul"></i></el-icon>
        <span slot="title">文章列表</span>
      </el-menu-item>
      <el-menu-item index="/post/featured">
        <el-icon :size="15"><i class="fa fa-thumbs-up"></i></el-icon>
        <span slot="title">推荐文章</span>
      </el-menu-item>
      <el-menu-item index="/post/top">
        <el-icon :size="15"><i class="fa fa-hand-o-up"></i></el-icon>
        <span slot="title">置顶文章</span>
      </el-menu-item>
      <el-menu-item index="/post/upload">
        <el-icon :size="15"><i class="fa fa-upload"></i></el-icon>
        <span slot="title">打包上传</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="photo" :route="{ meta: { breadcrumbName: '摄影' } }">
      <template #title>
        <el-icon :size="15"><i class="fa fa-camera-retro"></i></el-icon>
        <span>摄影</span>
      </template>
      <el-menu-item index="/photo/list">
        <el-icon :size="15"><i class="fa fa-photo"></i></el-icon>
        <span slot="title">照片列表</span>
      </el-menu-item>
      <el-menu-item index="/photo/featured">
        <el-icon :size="15"><i class="fa fa-file-photo-o"></i></el-icon>
        <span slot="title">推荐图片</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/system" :route="{ meta: { breadcrumbName: '系统管理' } }">
      <template #title>
        <el-icon :size="15"><i class="fa fa-gear fa-lg"></i></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="/system/visit_record/list">
        <el-icon :size="15"><i class="fa fa-clipboard"></i></el-icon>
        <span slot="title">访问日志</span>
      </el-menu-item>
      <el-menu-item index="/system/config/list">
        <el-icon :size="15"><i class="fa fa-external-link-square"></i></el-icon>
        <span slot="title">配置中心</span>
      </el-menu-item>
      <el-menu-item index="/system/Comments/list">
        <el-icon :size="15"><i class="fa fa-commenting"></i></el-icon>
        <span slot="title">评论中心</span>
      </el-menu-item>
      <el-menu-item index="/system/Notice/list">
        <el-icon :size="15"><i class="fa fa-newspaper-o"></i></el-icon>
        <span slot="title">公告中心</span>
      </el-menu-item>
      <el-menu-item index="/system/MessageList">
        <el-icon :size="15"><i class="fa fa-pencil-square"></i></el-icon>
        <span slot="title">留言中心</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="link" :route="{ meta: { breadcrumbName: '友链管理' } }">
      <template #title>
        <el-icon :size="15"><i class="fa fa-users"></i></el-icon>
        <span>友链管理</span>
      </template>
      <el-menu-item index="/link/list">
        <el-icon :size="15"><i class="fa fa-link"></i></el-icon>
        <span slot="title">友情链接</span>
      </el-menu-item>
      <el-menu-item index="/link_exchange/list">
        <el-icon :size="15"><i class="fa fa-envelope-open"></i></el-icon>
        <span slot="title">友链申请管理</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
  </el-scrollbar>
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
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
}

.menu-bar-container {
  width:200px;
  position: fixed;
  height: 100%;
  box-shadow: 2px 0 8px #1d23290d;
  transition: background-color 0.3s ease-in-out; 

  .logo {
    position: absolute;
    bottom: 3px;
    left:7px;
    line-height:56px;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
      border-radius: 0;
    }

    div {
      font-size: 22px;
      text-align: left;
    }
  }
}
.el-menu-item.is-active {
  background-color: #E2F7EB; /* 这里是你想要设置的当前菜单项背景颜色 */
  border-left: 4px solid green; /* 这里是你想要设置的圆角边框样式 */
  border-radius: 4px; /* 这里是你想要设置的圆角半径 */
}

</style>
