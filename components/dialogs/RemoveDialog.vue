<script setup lang="ts">
import { useStore } from '~/store';
import { useNotification } from '~/composibles/useNotification';

const store = useStore();
const { onRemoveDialogSettings } = storeToRefs(store);
const { successMessage } = useNotification();

const closeDialog = () => {
  onRemoveDialogSettings.value.active = false;
};

const submit = () => {
  store.removeTask(
    onRemoveDialogSettings.value.taskId,
    onRemoveDialogSettings.value.status,
  );
  closeDialog();
  successMessage('Order was removed successfully!');
};
</script>

<template>
  <Dialog
    v-model:visible="onRemoveDialogSettings.active"
    modal
    header="Remove"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 text-xl block mb-4">
      You want to remove task. Please submit!
    </span>
    <div class="grid">
      <div class="col">
        <Button
          label="Cancel"
          class="w-full"
          severity="danger"
          @click="closeDialog"
        />
      </div>
      <div class="col">
        <Button label="Submit" class="w-full" @click="submit" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped></style>
