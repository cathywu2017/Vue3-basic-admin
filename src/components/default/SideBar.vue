<script lang="ts" setup>
  import { RouterLink } from 'vue-router'
  import { User, Setting } from '@element-plus/icons-vue'
</script>

<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
  >
    <RouterLink to="/">
      <el-menu-item index="1">
        <el-icon><user /></el-icon>
        <span>
          Users
        </span>
      </el-menu-item>
    </RouterLink>
    <RouterLink to="/about">
      <el-menu-item index="2">
        <el-icon><setting /></el-icon>
        <span>
          About
        </span>
      </el-menu-item>
    </RouterLink>
  </el-menu>
</template>

<style scoped>
  .el-menu {
    border-right: none;
  }
</style>