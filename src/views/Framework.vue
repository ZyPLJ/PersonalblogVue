<template>
  <div class="container">
    <!-- 导航菜单栏 -->
    <Navbar></Navbar>
    <!-- 头部区域 -->
    <HeaderBar></HeaderBar>
    <!-- 主内容区域 -->
    <MainContent></MainContent>
  </div>
</template>

<script setup lang=ts>
import HeaderBar from "./HeaderBar.vue";
import MainContent from "./MainContent.vue";
import Navbar from "./Navbar.vue"
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
