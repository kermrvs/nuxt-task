<script setup lang="ts">
import type { Card } from '~/types/card';

interface IProps {
  item: Card;
}

const props = defineProps<IProps>();

const date = computed(() => {
  const date = new Date(props.item.created);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}:${month}:${year}`;
});
</script>

<template>
  <Card class="cursor-pointer">
    <template #content>
      <div class="flex justify-content-between">
        <div>{{ item.title }}</div>
        <Tag class="capitalize" value="Primary" v-if="item.priority === 'low'">
          {{ item.priority }}
        </Tag>
        <Tag
          class="capitalize"
          severity="warn"
          v-else-if="item.priority === 'medium'"
        >
          {{ item.priority }}
        </Tag>
        <Tag class="capitalize" severity="danger" v-else>
          {{ item.priority }}
        </Tag>
      </div>
      <div class="mt-4">
        Created at <span class="time">{{ date }}</span>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.time {
  font-weight: 600;
  font-size: 14px;
}
</style>
