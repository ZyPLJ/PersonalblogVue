<template>
  <div
    id="main-container"
    class="main-container"
    :class="
      store.state.app.collapse ? 'position-collapse-left' : 'position-left'
    "
  >
    <!-- 标签页 -->
    <!-- 标签页 -->
    <div class="tab-container" :style="{ display: fullscreen ? 'none' : '' }">
      <el-tabs
        class="tabs"
        :class="
          store.state.app.collapse ? 'position-collapse-left' : 'position-left'
        "
        v-model="mainTabsActiveName"
        :closable="true"
        type="card"
        @tab-click="selectedTabHandle"
        @tab-remove="removeTabHandle"
      >
        <el-dropdown class="tabs-tools" :show-timeout="0" trigger="hover">
          <div style="font-size: 20px; width: 50px">
            <i class="fa fa-arrow-down"></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="tabsCloseCurrentHandle"
                >关闭当前标签</el-dropdown-item
              >
              <el-dropdown-item @click="tabsCloseOtherHandle"
                >关闭其它标签</el-dropdown-item
              >
              <el-dropdown-item @click="tabsCloseAllHandle"
                >关闭全部标签</el-dropdown-item
              >
              <el-dropdown-item @click="tabsRefreshCurrentHandle"
                >刷新当前标签</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-tab-pane
          v-for="item in mainTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 主内容区域 -->
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, toRaw } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { nextTick } from "vue";

const store = useStore();
const router = useRouter();

let mainTabs = computed({
  get: () => {
    return store.state.tab.mainTabs;
  },
  set: (value) => {
    store.commit("updateMainTabs", value);
  },
});

let mainTabsActiveName = computed({
  get: () => {
    return store.state.tab.mainTabsActiveName;
  },
  set: (value) => {
    store.commit("updateMainTabsActiveName", value);
  },
});

const themeColor = computed(() => store.state.app.themeColor);
const collapse = computed(() => store.state.app.collapse);
const fullscreen = computed(() => store.state.app.fullscreen);

const selectedTabHandle = (elTab) => {
  console.log(toRaw(mainTabs.value));
  console.log("选中tab:", elTab);
  console.log(toRaw(elTab.props.name));
  let tabSet = toRaw(mainTabs.value).filter(
    (item) => item.name === toRaw(elTab.props.name)
  );
  console.log(tabSet);
  if (tabSet.length >= 1) {
    let tab = tabSet[0];
    router.push({ name: tab.name, params: tab.params });
  }
};

const removeTabHandle = (tabName) => {
  mainTabs.value = toRaw(mainTabs.value).filter(
    (item) => item.name !== tabName
  );
  if (mainTabs.value.length >= 1) {
    // 当前选中tab被删除
    if (tabName === mainTabsActiveName.value) {
      router.push({ name: mainTabs.value[mainTabs.value.length - 1].name });
      mainTabsActiveName.value = router.name;
    }
  } else {
    router.push("/");
  }
};

const tabsCloseCurrentHandle = () => {
  removeTabHandle(mainTabsActiveName.value);
};

const tabsCloseOtherHandle = () => {
  mainTabs.value = toRaw(mainTabs.value).filter(
    (item) => item.name === mainTabsActiveName.value
  );
};

const tabsCloseAllHandle = () => {
  mainTabs.value = [];
  router.push("/");
};

const tabsRefreshCurrentHandle = () => {
  let tempTabName = mainTabsActiveName.value;
  removeTabHandle(tempTabName);
  nextTick(() => {
    router.push({ name: tempTabName });
  });
};
console.log(mainTabs);
</script>

<style lang="scss" scoped>
.main-container {
  padding: 0 5px 5px;
  position: absolute;
  top: 60px;
  left: 1px;
  right: 1px;
  bottom: 0;
  background: rgba(245,246,251, 1);

  .tabs {
    position: fixed;
    top: 60px;
    right: 50px;
    padding-left: 0px;
    padding-right: 2px;
    z-index: 1020;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: rgb(255, 253, 255) !important;
    border-color: rgba(200, 206, 206, 0.5);
    // border-left-width: 1px;
    // border-left-style: solid;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }

  .tabs-tools {
    position: fixed;
    top: 60px;
    right: 0;
    z-index: 1020;
    height: 40px;
    // padding: 0 10px;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
    background: rgb(255, 253, 255) !important;
    border-color: rgba(200, 206, 206, 0.5);
    border-left-width: 1px;
    border-left-style: solid;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }

  .tabs-tools:hover {
    background: rgba(200, 206, 206, 1);
  }

  .main-content {
    position: absolute;
    top: 45px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    padding: 35px;
    overflow: auto; 
  }
  .content{
    padding: 15px;
    background: #fff;
    border: 1px solid rgb(239, 239, 245);
    border-radius:10px;
  }
}

.position-left {
  left: 200px;
}

.position-collapse-left {
  left: 65px;
}
</style>
