<script setup lang="ts">
import { useStore } from '~/store';

const store = useStore();
const { dialogSettings } = storeToRefs(store);

const title = computed(() => {
  return dialogSettings.value.item ? 'Edit card' : 'Create card';
});

const status = ref('');
</script>

<template>
  <Dialog
    v-model:visible="dialogSettings.active"
    modal
    :header="title"
    class="capitalize"
    :style="{ width: '45rem' }"
  >
    <div class="flex flex-column gap-3">
      <div class="grid">
        <div class="col">
          <div class="flex flex-column gap-2">
            <label class="font-medium text-xl" for="title">Title</label>
            <InputText id="title" />
          </div>
        </div>
        <div class="col">
          <div class="flex flex-column gap-2">
            <label class="font-medium text-xl" for="status">Status</label>
            <Select
              id="status"
              v-model="status"
              :options="store.statuses"
              placeholder="Select status"
              class="w-full md:w-56"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-column gap-2">
        <label class="font-medium text-xl" for="description">Description</label>
        <Textarea rows="5" cols="30" id="description" style="resize: none" />
      </div>
      <div class="grid">
        <div class="col">
          <div class="flex flex-column gap-2">
            <label class="font-medium text-xl" for="owner">Owner</label>
            <Select
              :options="store.persons"
              placeholder="Select status"
              class="w-full md:w-56"
              id="owner"
            />
          </div>
        </div>
        <div class="col">
          <div class="flex flex-column gap-2">
            <label class="font-medium text-xl" for="assignment"
              >Assignment</label
            >
            <Select
              :options="store.persons"
              placeholder="Select status"
              class="w-full md:w-56"
              id="assignment"
            />
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped></style>
