<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from './components/default/SideBar.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="25" height="25" />
        Header
      </el-header>

      <el-container>
        <el-aside width="100px">
          <SideBar />
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  background-color: #e5e5e5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 1rem 0 0;
  }
}
</style>
