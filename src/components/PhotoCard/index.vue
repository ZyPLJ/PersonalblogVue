<template>
  <el-popover
    placement="bottom"
    width="230"
  >
  <template #reference>
      <div class="m-1" style="width:30px;border:1px solid red;"></div>
    </template>
    <p>图片名称：{{ photo?.title }}</p>
    <p>拍摄地点：{{ photo?.location }}</p>
    <p>上传时间：{{ dateTimeStr }}</p>
    <el-button-group>
      <el-button type="" icon="el-icon-edit"></el-button>
      <el-button
        type="warning"
        icon="el-icon-check"
        @click="setFeatured"
      ></el-button>
      <el-button
        type="info"
        icon="el-icon-close"
        @click="cancelFeatured"
      ></el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        @click="deletePhoto"
      ></el-button>
    </el-button-group>
    <el-card
      slot="reference"
      :body-style="{ padding: '0px' }"
      style="margin: 5px"
    >
      <!--  去掉浏览器默认事件，添加自定义事件   -->
      <el-image
        :src="photo.url"
        class="image"
        :preview-src-list="[photo.url]"
        @contextmenu.prevent="onImageRightClick"
      ></el-image>
    </el-card>
  </el-popover>
</template>

<script setup lang=ts>
import { ref, computed, toRefs, onMounted,watch } from "vue";
import {
  setFeatured as s,
  cancelFeatured as c,
  deleteItem,
} from "../../http/modules/photo";
import { ElMessageBox, ElMessage } from "element-plus";

const emit = defineEmits(["onItemDeleted"]);
const props = defineProps({
  photo: {
    type: Object,
  },
});
const { photo } = toRefs(props);
const visible = ref(true);



onMounted(() => {
  
});
const dateTimeStr = computed(() => {
  let dt = new Date(photo?.value.createTime);
  return `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`;
});

const onImageRightClick = () => {
  visible.value = !visible.value;
};

const setFeatured = () => {
  s(photo?.value.id)
    .then((res) => ElMessage.success("设置推荐成功"))
    .catch((res) => ElMessage.error(`操作失败。${res.message}`));
  onImageRightClick();
};

const cancelFeatured = () => {
  c(photo?.value.id)
    .then((res) => ElMessage.success("取消推荐成功"))
    .catch((res) => ElMessage.error(`操作失败。${res.message}`));
  onImageRightClick();
};

const deletePhoto = () => {
  ElMessageBox.confirm("此操作将永久删除该图片, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteItem(photo?.value.id)
        .then((res) => {
          ElMessage.success(`删除成功。${res.message}`);
          // 删除完成，触发已删除事件
          emit("onItemDeleted");
        })
        .catch((res) => ElMessage.error(`操作失败。${res.message}`));
    })
    .catch(() => ElMessage("已取消删除"));
  onImageRightClick();
};
</script>

<style scoped>
</style>
