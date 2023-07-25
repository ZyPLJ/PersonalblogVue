<template>
  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane label="留言内容" name="first">
      <msglist ref="msglistRef" />
    </el-tab-pane>
    <el-tab-pane label="留言回复列表" name="second">
      <msgreplylist ref="msgreplylistRef" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import msglist from '../../components/message/msglist.vue'
import msgreplylist from '../../components/message/msgreplylist.vue'

const activeName = ref('first')
const msglistRef = ref(null)
const msgreplylistRef = ref(null)

const handleClick = (tab: TabsPaneContext, event: Event) => {
  if (tab.props.name === 'first') {
    msglistRef.value.load()
  } else if (tab.props.name === 'second') {
    msgreplylistRef.value.load()
  }
}


</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
