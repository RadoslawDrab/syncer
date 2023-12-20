<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps<{to: string}>()

const route = useRoute()
const className = computed(() => {
  const isActive = route.path === props.to 
  return `btn btn-border-bottom rounded-none btn-outline-${isActive ? 'primary' : 'secondary'} ${isActive ? 'btn-text-inherit': ''}`
})
</script>
<template>
  <RouterLink :class="className" :to="props.to">
    <slot>Link</slot>
  </RouterLink>
</template>