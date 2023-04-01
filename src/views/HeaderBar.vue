<template>
  <div
    class="header"
    :style="{ background: themeColor, display: fullscreen ? 'none' : '' }"
    :class="collapse ? 'position-collapse-left' : 'position-left'"
  >
    <!-- 导航收缩 -->
    <div class="hamburg">
      <el-menu
        class="el-menu-demo"
        :background-color="themeColor"
        text-color="#fff"
        :active-text-color="themeColor"
      >
        <el-menu-item index="1" @click="onCollapse">
          <Hamburger :isActive="collapse"></Hamburger>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 导航菜单 -->
    <span class="navbar">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        :background-color="themeColor"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="selectNavBar()"
      >
        <el-menu-item index="1" @click="router.push('/')">主页</el-menu-item>
        <!-- <el-menu-item
          index="2"
          @click="openWindow('https://github.com/Deali-Axy')"
          >菜单1</el-menu-item
        >
        <el-menu-item
          index="3"
          @click="openWindow('https://www.cnblogs.com/deali')"
          >菜单2</el-menu-item
        > -->
      </el-menu>
    </span>
    <!-- 工具栏 -->
     <span class="toolbar">
      <el-menu class="el-menu-demo" 
      :background-color="themeColor" 
      text-color="#14889A"
      :active-text-color="themeColor"
      mode="horizontal"
              style="height:60px"
              >
        <el-menu-item index="1">
          <!-- 主题切换 -->
          <ThemePicker class="theme-picker" :default="themeColor"
                        @onThemeChange="onThemeChange">
          </ThemePicker>
        </el-menu-item>
        <el-menu-item>
          <!-- 用户信息 -->
          <span class="user-info"><img :src="user.avatar"/>{{ user.name }}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <PersonalPanel :user="user"></PersonalPanel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, computed } from "vue";
import { mapState, useStore } from "vuex";
import Hamburger from "../components/Hamburger/index.vue";
import ThemePicker from "../components/ThemePicker/index.vue";
import NoticePanel from "./Auth/NoticePanel.vue";
import MessagePanel from "./Auth/MessagePanel.vue";
import PersonalPanel from "./Auth/PersonalPanel.vue";

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
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
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
</style>
