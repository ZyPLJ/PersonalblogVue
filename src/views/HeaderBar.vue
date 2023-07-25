<template>
  <div
    class="header"
    :class="collapse ? 'position-collapse-left' : 'position-left'"
  >
    <!-- 导航收缩 -->
    <div class="hamburg">
      <el-menu
        class="el-menu-demo"
      >
        <el-menu-item index="1" @click="onCollapse">
          <Hamburger :isActive="collapse"></Hamburger>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 导航菜单 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      style="border:0"
      router
    >
    <el-breadcrumb separator="/" style="line-height: 60px;margin-left:15px;">
        <span v-for="(crumb, index) in breadcrumbs" :key="index">
          <el-breadcrumb-item :to="crumb.path">
            {{ crumb.name }}
          </el-breadcrumb-item>
          <span v-if="index < breadcrumbs.length - 1"></span>
        </span>
      </el-breadcrumb>
      <div class="flex-grow" />
      <div @click="tooggleTheme">
        <el-icon>
          <i class="fa fa-sun-o"></i>
        </el-icon>
      </div>
      <el-sub-menu index="2">
        <template #title>{{ user.name }}</template>
        <el-menu-item index="/login" @click="tuichu">退出</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, computed,inject } from "vue";
import { mapState, useStore } from "vuex";
import { useRoute,useRouter } from 'vue-router';
import Hamburger from "../components/Hamburger/index.vue";
import { logout } from "../utils/auth";

const tuichu = ()=>{
  logout();
}

const theme = inject('theme')
const tooggleTheme = () =>{
  theme.toggleDark()
}


interface Breadcrumb {
  name: string;
  path: string;
}

const breadcrumbs = computed<Breadcrumb[]>(() => {
  const routes = useRoute().matched;
  const result: Breadcrumb[] = [];
  console.log(routes)
  routes.forEach(route => {
    if (route.name) {
      result.push({
        name: route.name,
        path: route.path
      });
    }
  });
  const routePath = useRoute().path;
  if (routePath.startsWith('/link')) {
    result.unshift({
      name: '友链管理',
      path: '/link/list'
    });
  }
  if (routePath.startsWith('/system')) {
    result.unshift({
      name: '系统管理',
      path: '/system/visit_record/list'
    });
  }
  if (routePath.startsWith('/photo')) {
    result.unshift({
      name: '摄影',
      path: '/photo/list'
    });
  }
  if (routePath.startsWith('/post')) {
    result.unshift({
      name: '博客',
      path: '/post/list'
    });
  }
  return result;
});


declare var require: any;
const store = useStore();
const user = ref();
user.value = {
  name: "CodeLab",
  avatar: require("@/assets/user.png"),
  role: "超级管理员2",
  registerInfo: "注册时间：2021-12-25 ",
};
const activeIndex = ref(1);
const langVisible = ref(false);

const openWindow = (url) => {
  window.open(url);
};
const selectNavBar = (key, keyPath) => {
  console.log(key, keyPath);
};
//折叠导航栏
const onCollapse = () => {
  store.commit("onCollapse");
};
//切换主题
const onThemeChange = (themeColor) => {
  store.commit("setThemeColor", themeColor);
};

onMounted(() => {
  let user1 = localStorage.getItem("user");
  if (user1) {
    user.value.name = user1;
    user.value.avatar = require("@/assets/star.jpg");
  }
});

const themeColor = computed(() => store.state.app.themeColor);
const collapse = computed(() => store.state.app.collapse);
const fullscreen = computed(() => store.state.app.fullscreen);


</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  box-shadow: 0 1px 2px #00152914;
}

.hamburg,
.navbar {
  float: left;
}

.toolbar {
  float: right;
  height: 60px;
  line-height: 60px;
}

.user-info {
  font-size: 20px;
  color: #fff;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
}

.badge {
  line-height: 18px;
}

.position-left {
  left: 200px;
}

.position-collapse-left {
  left: 65px;
}
.flex-grow {
  flex-grow: 1;
}
</style>
