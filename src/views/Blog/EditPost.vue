<template>
  <el-container>
    <el-header height="30px">
      <el-row :gutter="6">
        <el-col :span="3">
          <el-select
            v-model="postCategoryName"
            filterable
            placeholder="请选择分类"
            v-on:change="categoryChange"
          >
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select
              v-model="postTag"
              multiple
              placeholder="请选择标签"
              v-on:change="handleTag"
            >
              <el-option
                v-for="item in Tag"
                :key="item.id"
                :label="item.name"
                :value="item.id" 
              />
            </el-select>
        </el-col>
        <el-col :span="15">
          <el-input v-model="postTitle" placeholder="文章标题"></el-input>
        </el-col>
        <el-col :span="1">
          <el-button
            type="warning"
            plain
            @click="onSummaryClick"
            :style="'width:100%'"
            >简介</el-button
          >
        </el-col>
        <el-col :span="1">
          <el-button type="primary" plain @click="onSaveClick">保存</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <v-md-editor
        v-model="postContent"
        :default-show-toc="true"
        :codemirror-style-reset="true"
        :disabled-menus="mode === 'edit' ? [] : ['image/upload-image']"
        @save="onEditorSave"
        @fullscreen-change="fullscreenChange"
        @upload-image="handleUploadImage"
        height="750px"
      />
    </el-main>
  </el-container>
</template>

<script setup lang=ts>
// todo 应该增加一个关闭页面提示，或者是关闭页面自动保存的功能~
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { uploadImage, get,add,update } from "../../http/modules/blogPost";
import { getAll } from "../../http/modules/category";
import { useRoute, useRouter } from "vue-router";
import { ElNotification, ElMessage,ElMessageBox  } from "element-plus";
import { getAllTag } from "../../http/modules/Tag";

const route = useRoute();
const router = useRouter();
const store = useStore();

const mode = ref("new");
const postTitle = ref("");
const postCategoryName = ref("");
const postTag = ref("")
const postCategoryId = ref(0);
const postContent = ref("");
const postSummary = ref("");
const post = ref();
post.value = null;
const categories = ref();
categories.value = [];
//标签
const Tag = ref([])

// 全屏切换
const fullscreenChange = (isFullscreen) => {
  store.commit("onFullscreenChange");
};
// 初始化
const init = () => {
  let id = route.params.id;
  if (id) {
    mode.value = "edit";
    get(id)
      .then((res) => {
        post.value = res.data;
        postTitle.value = post.value.title;
        postContent.value = post.value.content;
        postSummary.value = post.value.summary;
        postCategoryId.value = post.value.categoryId;
        postCategoryName.value = post.value.categories.name;
        postTag.value = post.value.postTags.map(pt => pt.tagId);
        ElNotification.info({
          title: "当前模式：修改文章",
          message: `加载文章：${postTitle.value}`,
          showClose: false,
        });
      })
      .catch((res) => ElMessage.error(`获取信息失败。${res.message}`));
  } else {
    mode.value = "new";
    post.value = {};
    ElNotification.warning({
      title: "当前模式：新建文章",
      message: "注意：只有保存文章之后才能上传图片！",
      showClose: false,
    });
  }
};

/**
 * 上传图片处理
 * @param event
 * @param insertImage Function
 * @param files
 */
const handleUploadImage = (event, insertImage, files) => {
  let file = files[0];
  uploadImage(post.value.id, file)
    .then((res) => {
      ElMessage.success(`添加图片：${res.data.imgName}`);
      insertImage({
        url: res.data.imgUrl.replaceAll("\\", "/"),
        desc: res.data.imgName,
      });
    })
    .catch((res) => ElMessage.error(`上传图片失败。${res.message}`));
};

// 分类切换
const categoryChange = (categoryId) => {
  postCategoryId.value = categoryId;
};
const loadCategories = () => {
  getAll().then((res) => (categories.value = res.data));
};
const loadTags = async() =>{
  const response = await getAllTag()
  Tag.value = response.data
}

const onEditorSave = (text, html)=>{
  save()
}
const onSaveClick = ()=>{
  save()
}
const onSummaryClick = ()=>{
 ElMessageBox.prompt('请输入文章简介', '提示', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputValue:postSummary.value
  })
    .then(({ value }) => {
      postSummary.value = value
      ElMessage({
        type: 'success',
        message: `编辑简介成功：${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消输入',
      })
    })
}

const save = () => {
  const tags = postTag.value.map(tagId => {
    const tag = Tag.value.find(t => t.id === tagId);
    return tag ? { id: tag.id, name: tag.name } : null;
  });
  let p = post.value;
  p.title = postTitle.value;
  p.content = postContent.value;
  p.summary = postSummary.value;
  p.categoryId = postCategoryId.value;
  p.tags = tags
  if(mode.value === 'new'){
    add(post.value).then(res=>{
      ElMessage.success(`保存成功。${res.message}`)
      router.push(`/post/edit/${res.data.id}`)
    }).catch(res=>{
      ElMessage.error(`操作失败。${res.message}`)
    })
  }else{
      update(post.value)
      .then(res=>ElMessage.success(`保存成功。${res.message}`))
      .catch(res => ElMessage.error(`操作失败。${res.message}`))
  }
};

init()
loadTags()
loadCategories()
</script>

<style lang="scss">
.v-md-editor {
  text-align: start;
  .codemirror-wrapper {
    .CodeMirror {
      font-size: 18px !important;
    }
  }
}
</style>
