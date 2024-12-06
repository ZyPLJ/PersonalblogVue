<template>
    <div>
      <div v-for="tag in tags">
        <el-tag>{{ tag.name }}</el-tag>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps({
    tags: {
      type: Array,
      required: true,
    },
  });
  
  </script>
  