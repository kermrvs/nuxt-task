<script setup lang="ts">
interface IProps {
  item: {
    title: string;
    id: number | string;
  };
}

defineProps<IProps>();
</script>

<template>
  <Card>
    <template #content>{{ item.title }}</template>
  </Card>
</template>

<style scoped></style>
