<script setup lang="ts">
import { useStore } from '~/store';
import { VueDraggableNext } from 'vue-draggable-next';

const store = useStore();
const { doneList } = storeToRefs(store);

const list = computed({
  get() {
    return doneList.value;
  },
  set(value) {
    doneList.value = value;
  },
});

const onChange = (val) => {
  const { added } = val;
  if (added) {
    store.updateTask({
      task: added.element,
      newStatus: 'done',
    });
  }
};
</script>

<template>
  <Card>
    <template #title><span class="font-bold">Done</span></template>
    <template #content>
      <div>
        <div class="flex flex-column gap-3">
          <client-only>
            <vue-draggable-next
              class="flex flex-column gap-3"
              v-model="list"
              group="people"
              @change="onChange"
            >
              <task-item
                v-for="(item, index) in list"
                :key="index"
                :item="item"
              ></task-item>
            </vue-draggable-next>
          </client-only>
        </div>
        <div
          class="flex align-items-center gap-2 cursor-pointer mt-3"
          @click="createCard"
        >
          <i class="pi pi-plus"></i> Add a card
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped></style>
