<template>
  <el-row class="action-block">
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark">
        <el-button type="success" size="default" @click="openDialog('search')">搜尋</el-button>
        <el-button type="success" size="default" @click="openDialog('add')">新增</el-button>
        <el-button type="success" size="default">匯出</el-button>
      </div>
    </el-col>
  </el-row>

  <TheSearchDialog
    :dialogSearchVisible="dialogSearchVisible"
    :data="data"
    @changeSearchVisible="changeSearchVisible"
    @changeData="changeData"
  />

  <TheAddDialog
    :dialogAddVisible="dialogAddVisible"
    :data="data"
    @changeAddVisible="changeAddVisible"
    @changeAddData="changeAddData"
  />

  <el-table :data="data.ret" border style="width: 100%">
    <el-table-column prop="id" width="100" label="序" />
    <el-table-column prop="username" label="使用者帳號" />
    <el-table-column prop="created_at" label="建立時間" />
    <el-table-column prop="enable" label="啟用" />
    <el-table-column prop="locked" label="鎖定" />
    <el-table-column prop="Operations" label="操作">
      <el-button type="primary" size="small">Edit</el-button>
      <el-button type="danger" size="small">Delete</el-button>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import TheSearchDialog from '../dialog/TheSearchDialog.vue';
import TheAddDialog from '../dialog/TheAddDialog.vue';

const dialogSearchVisible = ref(false);
const dialogAddVisible = ref(false);

const data = ref({
  ret: [],
});
const error = ref('');

// 開啟彈窗
const openDialog = (type: string) => {
  if (type === 'search') {
    dialogSearchVisible.value = true
  }

  if (type === 'add') {
    dialogAddVisible.value = true
  }
}

// 變更搜尋彈窗
const changeSearchVisible = () => {
  dialogSearchVisible.value = false
}

// 變更新增彈窗
const changeAddVisible = () => {
  dialogAddVisible.value = false
}

const changeData = (res: { ret: [] }) => {
  console.log(res);
  data.value = res
}

const changeAddData = (res: { ret: [] }) => {
  console.log(res);
  data.value.ret.push({ ...res.ret })
}

const getUsers = () => {
  fetch('http://localhost:9988/api/users')
    .then((res) => res.json())
    .then((d) => (data.value = d))
    .catch((err) => error.value = err)
}

onMounted(() => {
  getUsers();
})
</script>

<style scoped>
  .action-block {
    margin-bottom: 15px;
  }
</style>