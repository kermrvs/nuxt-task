<script setup lang="ts">
import { useStore } from '~/store';

const store = useStore();
const { dialogSettings } = storeToRefs(store);

const title = computed(() => {
  return dialogSettings.value.item ? 'Edit card' : 'Create card';
});

watch(
  () => dialogSettings.active,
  (newVal) => {
    if (!newVal) {
      dialogSettings.value.item = null;
    }
  },
);
</script>

<template>
  <Dialog
    v-model:visible="dialogSettings.active"
    modal
    :header="title"
    class="capitalize"
    :style="{ width: '45rem' }"
  >
    <div>1</div>
  </Dialog>
</template>

<style scoped></style>
