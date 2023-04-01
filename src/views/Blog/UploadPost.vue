<template>
  <el-row>
    <el-col :span="8">
      <el-form
        ref="uploadForm"
        :model="form"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="文章分类" prop="categoryId">
          <el-select
            v-model="form.Categoryname"
            filterable
            allow-create
            default-first-option
            placeholder="请选择分类"
            :reserve-keyword="false"
            v-on:change="handleCategoryChange"
          >
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-upload
        ref="upload"
        drag
        action=""
        accept="application/x-zip-compressed,.zip"
        :file-list="fileList"
        :on-change="onUploadChange"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传zip文件</div>
      </el-upload>

      <el-row type="flex" justify="end">
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup lang=ts>
import { ref, computed } from "vue";
import { getAll } from "../../http/modules/category";
import { upload } from "../../http/modules/blog";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const dialogFormVisible = ref(false);
const fileList = ref();
fileList.value = [];
const categories = ref();
categories.value = [];
const currentCategoryName = ref("");
const currentCategoryId = ref(0);
const form = ref();
form.value = {
  Categoryname: null,
  file: null,
};

const loadCategories = () => {
  getAll()
    .then((res) => (categories.value = res.data))
    .catch((res) => ElMessage.error(`获取文章分类出错：${res.message}`));
};
const handleCategoryChange = (Categoryname) => {
  currentCategoryName.value = Categoryname;
};
const onUploadChange = (file, fileList) => {
  const isIMAGE = file.raw.type === "application/x-zip-compressed";
  if (!isIMAGE) {
    ElMessage.error("只能上传zip压缩包!");
    return false;
  }

  if (fileList.length > 0) {
    fileList.value = [fileList[fileList.length - 1]];
  }

  form.value.file = file;
};
const submitUpload = () => {
  upload(form.value.Categoryname, form.value.file.raw).then((res) => {
    if (res.successful) {
      ElMessage({ message: "上传文章成功", type: "success" });
      router.push("/post/list");
    }
  });
};

loadCategories()
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>
