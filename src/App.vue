<template>
  <div :class="{ 'dark': isDark }">
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import { useDark,useToggle  } from '@vueuse/core';
import { provide } from 'vue';

const isDark = useDark()
const toggleDark = useToggle(isDark)

provide('theme',{
  isDark,
  toggleDark
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
