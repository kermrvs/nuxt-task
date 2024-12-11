<script setup lang="ts">
import { useStore } from '~/store';
import { useNotification } from '~/composibles/useNotification';

const store = useStore();
const { dialogSettings } = storeToRefs(store);
const { successMessage } = useNotification();

const title = computed(() => {
  return dialogSettings.value.item ? 'Edit card' : 'Create card';
});

const payload = ref({
  status: dialogSettings.value.status,
  title: '',
  description: '',
  priority: '',
  owner: '',
  assignees: [],
});

watch(
  () => dialogSettings.value.item,
  (newVal) => {
    if (newVal)
      payload.value = {
        ...newVal,
      };
    else clearPayload();
  },
);

const clearPayload = () => {
  payload.value = {
    status: dialogSettings.value.status,
    title: '',
    description: '',
    priority: '',
    owner: '',
    assignees: [],
  };
};

const createCard = () => {
  if (!dialogSettings.value.item) {
    store.createTask(payload.value, payload.value.status);
    successMessage('Order was created successfully!');
  } else {
    store.updateTask(payload.value, payload.value.status);
    successMessage('Order was updated successfully!');
  }
  dialogSettings.value.active = false;
};

const closeDialog = () => {
  dialogSettings.value.active = false;
};
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
            <InputText id="title" v-model="payload.title" />
          </div>
        </div>
        <div class="col">
          <div class="flex flex-column gap-2">
            <label class="font-medium text-xl" for="status">Status</label>
            <Select
              id="status"
              v-model="payload.status"
              :options="store.statuses"
              placeholder="Select status"
              class="w-full md:w-56"
            />
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="col">
          <div class="flex flex-column gap-2">
            <label class="font-medium text-xl" for="owner">Owner</label>
            <Select
              v-model="payload.owner"
              :options="store.persons"
              placeholder="Select owner"
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
            <MultiSelect
              v-model="payload.assignees"
              :options="store.persons"
              placeholder="Select assignments"
              class="w-full md:w-80"
              id="assignment"
            />
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="col-6">
          <div class="flex flex-column gap-2">
            <label class="font-medium text-xl" for="status">Priority</label>
            <Select
              id="status"
              v-model="payload.priority"
              :options="store.priorities"
              placeholder="Select priority"
              class="w-full md:w-56"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value">
                  <Tag
                    class="capitalize"
                    value="Primary"
                    v-if="slotProps.value === 'low'"
                  >
                    {{ slotProps.value }}
                  </Tag>
                  <Tag
                    class="capitalize"
                    severity="warn"
                    v-else-if="slotProps.value === 'medium'"
                  >
                    {{ slotProps.value }}
                  </Tag>
                  <Tag class="capitalize" severity="danger" v-else>
                    {{ slotProps.value }}
                  </Tag>
                </div>
                <div v-else>{{ slotProps.placeholder }}</div>
              </template>
            </Select>
          </div>
        </div>
      </div>
      <div class="flex flex-column gap-2">
        <label class="font-medium text-xl" for="description">Description</label>
        <Textarea
          rows="5"
          cols="30"
          id="description"
          style="resize: none"
          v-model="payload.description"
        />
      </div>
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
          <Button label="Submit" class="w-full" @click="createCard" />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped></style>
