<template>
  <div class="message-panel">
    <div class="message-header">您有 {{ props.data.length }} 条消息</div>
    <div class="message-content">
      <div v-for="item in props.data" :key="item.key" class="message-item">
        <div class="message-avatar">
          <img class="avatar" :src="require('@/assets/user.png')"/>
        </div>
        <span class="sender">
          {{ item.sender }}
        </span>
        <span class="time">
          <li class="fa fa-clock-o"></li> {{ item.time }}
        </span>
        <div class="message-cotent">
          {{ item.content }}
        </div>
      </div>
    </div>
    <div class="message-footer">查看所有消息</div>
  </div>
</template>
<script setup lang='ts'>
import {defineProps} from "vue"

const props = defineProps({
  data: {
      type: Array,
      default: () => [
        {
          key: "1",
          icon: 'fa fa-envelope-o',
          content: '你修改了用户密码'
        },
        {
          key: "2",
          icon: 'fa fa-music',
          content: '你修改了用户头像'
        },
        {
          key: "3",
          icon: 'fa fa-edit',
          content: '今日25名新成员加入'
        },
        {
          key: "4",
          icon: 'fa fa-edit',
          content: '您发表了一篇新随笔'
        }]
    }
})

</script>


<style scoped>
.message-panel {
  font-size: 15px;
  width: 300px;
  margin: -12px;
}

.message-header {
  padding-left: 10px;
  font-size: 14px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.message-content {
  font-size: 15px;
}

.message-item {
  border-color: rgba(180, 190, 190, 0.8);
  border-top-width: 1px;
  border-top-style: solid;
  padding-top: 10px;
  padding-bottom: 10px;
}

.message-item:hover {
  cursor: pointer;
  background: #b1a6a61e;
}

.message-avatar {
  padding-left: 10px;
}

.avatar {
  margin-right: 10px;
}

.sender {
  font-size: 16px;
  font-weight: bold;
}

.time {
  font-size: 12px;
  float: right;
  padding-right: 10px;
}

.message-footer {
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.8);
  border-top-width: 1px;
  border-top-style: solid;
}

.message-footer:hover {
  cursor: pointer;
  background: #b1a6a61e;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 90px;
  float: left;
}
</style>
