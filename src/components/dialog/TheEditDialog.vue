<template>
  <el-dialog
    v-model="isShow"
    title="修改"
    width="350px"
    :before-close="closeDialog"
  >
    <el-form>
      <el-form-item label="帳號">
        {{props.row.username}}
      </el-form-item>
      <el-form-item label="啟用">
        <el-radio-group v-model="form.enable">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="鎖定">
        <el-radio-group v-model="form.locked">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit">確認</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  dialogEditVisible: Boolean,
  row: Object,
})

const emits = defineEmits([
  'changeEditVisible',
  'getUsers',
])

const initForm = {
  id: 1,
  enable: '1',
  locked: '1',
};

const isShow = ref(false);
const error = ref('');
const form = ref({ ...initForm });

const closeDialog = () => {
  emits('changeEditVisible')
}

const submit = () => {
  const body = form.value;
  const params = {
    method: 'PUT',
    headers:new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  }

  fetch(`http://localhost:9988/api/user/${form.value.id}`, params)
    .then((res) => res.json())
    .then(() => emits('getUsers'))
    .catch((err) => error.value = err)

  // 送出搜尋
  closeDialog();
}

// 監聽 dialogAddVisible 是否變動
watch(
  () => props.dialogEditVisible,
  (newVal) => {
    isShow.value = newVal;
})

// 監聽 row 是否變動
watch(
  () => props.row,
  (newVal) => {
    form.value = {
      id: newVal.id,
      enable: newVal.enable.toString(),
      locked: newVal.locked.toString(),
    };
})
</script>


<style scoped>
</style>