<script setup lang="ts">
import { useStore } from '~/store';
import { VueDraggableNext } from 'vue-draggable-next';

const store = useStore();
const { backlogsCards } = storeToRefs(store);

const list = computed({
  get() {
    return backlogsCards.value;
  },
  set(value) {
    backlogsCards.value = value;
  },
});

const onChange = (val) => {
  const { added } = val;
  if (added) {
    store.updateTask({
      task: added.element,
      newStatus: 'backlog',
    });
  }
};

const createCard = () => {
  store.openDialog('backlog');
};

const openDialog = (card) => {
  store.openDialog('backlog', card);
};
</script>

<template>
  <Card>
    <template #title><span class="font-bold">Backlog</span></template>
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
