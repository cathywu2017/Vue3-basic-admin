<template>
  <el-dialog
    title="搜尋"
    width="350px"
    v-model="isShow"
    :before-close="closeDialog"
  >
    <el-form>
      <el-form-item label="帳號">
        <el-input
          v-model="form.username"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="開始日期">
        <div class="demo-date-picker">
          <div class="block">
            <el-date-picker
              v-model="form.start_created_at"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="start date"
              size="default"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="結束日期">
        <div class="demo-date-picker">
          <div class="block">
            <el-date-picker
              v-model="form.end_created_at"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="end date"
              size="default"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="啟用">
        <el-radio-group
          v-model="form.enable"
        >
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
  dialogSearchVisible: Boolean,
  data: Object,
});

const emits = defineEmits([
  'changeSearchVisible',
  'changeData',
]);

const initForm = {
  username: '',
  start_created_at: '',
  end_created_at: '',
  enable: '1',
  locked: '1',
};

const isShow = ref(false);
const error = ref('');
const form = ref({ ...initForm });

// 關閉彈窗
const closeDialog = () => {
  emits('changeSearchVisible')

  //關閉後清空 input 資料
  form.value = { ...initForm };
}

// 送出搜尋
const submit = () => {
  let str = '';

  Object.entries(form.value).forEach(([key, value]) => {
    if (value !== '') {
      str += `${key}=${value}&`
    }
  })

  const str2 = str.slice(0, -1);

  fetch(`http://localhost:9988/api/users?${str2}`)
    .then((res) => res.json())
    .then((res) => emits('changeData', res))
    .catch((err) => error.value = err)

  // 送出搜尋
  closeDialog();
}

// 監聽 dialogSearchVisible 是否變動
watch(
  () => props.dialogSearchVisible,
  (newVal) => {
    isShow.value = newVal;
})
</script>

<style scoped>
  /* 日期選擇器 */
  .demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
  }

  .demo-date-picker .block {
    border-right: solid 1px var(--el-border-color);
    flex: 1;
  }

  .demo-date-picker .block:last-child {
    border-right: none;
  }
</style>
