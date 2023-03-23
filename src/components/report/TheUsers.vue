<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" width="100" />
    <el-table-column prop="username" label="使用者帳號" />
    <el-table-column prop="created_at" label="建立時間" />
    <el-table-column prop="enable" label="啟用" />
    <el-table-column prop="locked" label="鎖定" />
    <el-table-column prop="operate" label="操作" />
  </el-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    id: 1,
    username: 'user1',
    enable: 0,
    locked: 1,
    created_at: '2023-03-14T17:24:05+08:00'
  },
]
</script>