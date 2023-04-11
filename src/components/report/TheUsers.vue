<template>
  <el-row class="action-block">
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark">
        <el-button type="success" size="default" @click="openDialog('search', null)">搜尋</el-button>
        <el-button type="success" size="default" @click="openDialog('add', null)">新增</el-button>
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
      <template #default="scope">
        <el-button type="primary" size="small" @click="openDialog('edit', scope.row)">Edit</el-button>
        <el-button type="danger" size="small" @click="openDialog('delete', scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>

  <TheEditDialog
    :dialogEditVisible="dialogEditVisible"
    :row="row"
    @changeEditVisible="changeEditVisible"
    @getUsers="getUsers"
  />

  <TheDeleteDialog
    :dialogDeleteVisible="dialogDeleteVisible"
    :deleteInfo="deleteInfo"
    @changeDeleteVisible="changeDeleteVisible"
    @getUsers="getUsers"

  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import TheSearchDialog from '../dialog/TheSearchDialog.vue';
import TheAddDialog from '../dialog/TheAddDialog.vue';
import TheEditDialog from '../dialog/TheEditDialog.vue';
import TheDeleteDialog from '../dialog/TheDeleteDialog.vue';

const dialogSearchVisible = ref(false);
const dialogAddVisible = ref(false);
const dialogEditVisible = ref(false);
const dialogDeleteVisible = ref(false);
const row = ref({});
const data = ref({
  ret: [],
});
const deleteInfo = ref({});
const error = ref('');

// 開啟彈窗
const openDialog = (type: string, info: object) => {
  if (type === 'search') {
    dialogSearchVisible.value = true
  }

  if (type === 'add') {
    dialogAddVisible.value = true
  }

  if (type === 'edit') {
    dialogEditVisible.value = true

    row.value = info
  }

  if (type === 'delete') {
    dialogDeleteVisible.value = true

    deleteInfo.value = info;
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

// 變更編輯彈窗
const changeEditVisible = () => {
  dialogEditVisible.value = false
}

// 變更刪除彈窗
const changeDeleteVisible = () => {
  dialogDeleteVisible.value = false
}

const changeData = (res: { ret: [] }) => {
  data.value = res
}

const changeAddData = (res: { ret: [] }) => {
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