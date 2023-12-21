<script setup lang="ts">
import { ref } from 'vue';
import { PhHeadphones, PhList } from '@phosphor-icons/vue'

import { tailwind } from 'config/tailwind.config'
import { capitalizeFirstLetter } from 'shared/utils/string';
import router from 'router';
import useTheme from 'composables/useTheme';
import useEventListener from 'composables/useEventListener';

import LayoutHeaderLink from './LayoutHeaderLink.vue';


const routes = router.getRoutes()
const theme = useTheme()

const navIsHidden = ref<boolean>(false)

function toggleNavigation() {
  navIsHidden.value = !navIsHidden.value
}

useEventListener(window, 'resize', (event) => {
  // Shows navigation if window is larger than small size defined in tailwind
  const target = event.currentTarget as Window
  const isSmall = !target.matchMedia(`(min-width: ${tailwind.theme.screens.sm})`).matches    
  if(!isSmall) {
    navIsHidden.value = false
  }
})
</script>

<template>
  <header>
    <div class="flex items-center gap-4">
    <button @click="router.push('/')">
      <PhHeadphones size="30" class="fill-primary-500" />
    </button>
    <Transition>
      <nav v-show="!navIsHidden">
        <LayoutHeaderLink v-for="route in routes" :key="route.name" :to="route.path">{{ capitalizeFirstLetter(route.name?.toString() ?? '') }}</LayoutHeaderLink>
      </nav>
    </Transition>
    <button class="btn btn-primary" @click="theme.toggle">{{ capitalizeFirstLetter(theme.value) }}</button>
    <button :class="['sm:hidden btn btn-transparent-primary', navIsHidden ? 'text-inherit' : '']" @click="toggleNavigation">
      <PhList size="30" class="fill-current" />
    </button>
  </div>
  <AppDropdown content-position="left-bottom">
    <template #button>
      <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
    </template>
    <template #content>
      <div class="flex flex-col gap-2 p-3 bg-secondary-100 border-2 border-secondary-200">
        <button class="btn btn-transparent-secondary w-max">Sign In</button>
        <button class="btn btn-transparent-secondary w-max">Sign Up</button>
        <button class="btn btn-transparent-secondary w-max">Account</button>
        <button class="btn btn-transparent-secondary w-max">Sign Out</button>
      </div>
    </template>
  </AppDropdown>
  </header>
</template>

<style scoped lang="scss">
header {
  @apply sticky top-0 left-0 px-4 py-3 mb-5 flex justify-between items-center gap-1 bg-light dark:bg-dark border-secondary-100 dark:border-secondary-900 text-secondary-800 dark:text-secondary-200;

  &::before {
    @apply content-[''] -z-10 absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-full bg-inherit border-b-2 border-inherit dark:border-inherit;
  }
  & > div {
    @apply bg-inherit;
    nav {
      @apply absolute top-full inset-x-0 w-full p-7 bg-inherit border-b-2 border-inherit flex flex-col items-start gap-2;
      @apply sm:static sm:h-auto sm:w-auto sm:border-0 sm:p-0 sm:flex-row sm:flex;  
    }
  }
}

.v-enter-active,
.v-leave-active {
  @apply transition-all duration-500;
}
.v-leave-from,
.v-enter-to {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.v-enter-from,
.v-leave-to {
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
}
</style>stores/useTheme