<template>
  <el-dialog v-model="isShow" title="新增" width="350px">
    <el-form>
      <el-form-item label="帳號">
        <el-input v-model="form.username" autocomplete="off" />
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
  dialogAddVisible: Boolean,
  data: Object,
})

const emits = defineEmits([
  'changeAddVisible',
  'changeAddData',
])

const initForm = {
  username: '',
  enable: '1',
  locked: '1',
};

const isShow = ref(false);
const error = ref('');
const form = ref({ ...initForm });

const closeDialog = () => {
  emits('changeAddVisible')

  //關閉後清空 input 資料
  form.value = { ...initForm };
}

const submit = () => {
  const body = form.value;
  const params = {
    method: 'POST',
    headers:new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  }

  fetch('http://localhost:9988/api/user', params)
    .then((res) => res.json())
    .then((res) => emits('changeAddData', res))
    .catch((err) => error.value = err)

  // 送出搜尋
  closeDialog();
}

// 監聽 dialogAddVisible 是否變動
watch(
  () => props.dialogAddVisible,
  (newVal) => {
    isShow.value = newVal;
})
</script>


<style scoped>
</style>