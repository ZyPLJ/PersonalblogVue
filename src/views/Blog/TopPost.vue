<template>
  <el-result icon="info" title="置顶文章" subTitle="当前置顶文章信息">
    <template #extra>
      <p>ID：{{ list?.id }}</p>
      <p>标题：{{ list?.title }}</p>
      <p>分类：{{ list?.categories?.name }}</p>
      <el-button type="primary" size="medium" @click="viewPost" plain
        >查看文章</el-button
      >
    </template>
  </el-result>
</template>

<script setup lang=ts>
import { ref, onMounted,computed } from "vue";
import { top } from "../../http/modules/blog";
import { ElMessage } from "element-plus";
import { fa } from "element-plus/es/locale";

const data = ref();
const loading = ref(false)
onMounted(async () => {
  data.value = (await top()).data;
  console.log(data);
  loading.value = true
});

const list = computed(()=>{
  return data.value
})
const viewPost = () => {
  ElMessage.info("功能未实现");
};
</script>

<style scoped>
</style>
