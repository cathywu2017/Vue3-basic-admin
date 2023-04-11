<template>
  <el-dialog
    v-model="isShow"
    title="刪除"
    width="30%"
    :before-close="closeDialog"
  >
    <span>是否確認刪除{{deleteInfo.username}}？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleDelete">確認</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts"  setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
    dialogDeleteVisible: Boolean,
    deleteInfo: Object,
  })

  const emits = defineEmits([
    'getUsers',
    'changeDeleteVisible',
  ])

  const isShow = ref(false);
  const error = ref('');

  const closeDialog = () => {
  emits('changeDeleteVisible')
}

  const handleDelete = () => {
    const params = {
      method: 'Delete',
      headers:new Headers({
        'Content-Type': 'application/json',
      }),
    }

    fetch(`http://localhost:9988/api/user/${props.deleteInfo.id}`, params)
      .then((res) => res.json())
      .then(() => emits('getUsers'))
      .catch((err) => error.value = err)

    closeDialog();
  }

  // 監聽 dialogAddVisible 是否變動
  watch(
    () => props.dialogDeleteVisible,
    (newVal) => {
      isShow.value = newVal;
  })
</script>