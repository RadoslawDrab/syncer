<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { PhHeadphones } from '@phosphor-icons/vue'

</script>

<template>
  <header class="px-4 py-2 w-full flex justify-between gap-1">
    <PhHeadphones size="30" />
    <button class="button">Test</button>
    <nav class="flex justify-between gap-2">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/">Library</RouterLink>
      <RouterLink to="/">Sign Up</RouterLink>
      <RouterLink to="/">Sign In</RouterLink>
    </nav>
  </header>
</template>