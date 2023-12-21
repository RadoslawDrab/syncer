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
    <div>
      <button @click="router.push('/')">
        <PhHeadphones size="30" class="fill-primary-500" />
      </button>
      <Transition>
        <nav v-show="!navIsHidden">
          <LayoutHeaderLink v-for="route in routes" :key="route.name" :to="route.path">{{ capitalizeFirstLetter(route.name?.toString() ?? '') }}</LayoutHeaderLink>
        </nav>
      </Transition>
      <AppButton :button-style="{ color: 'primary'}" @click="theme.toggle">
        {{ capitalizeFirstLetter(theme.value) }}
      </AppButton>
      <AppButton :button-style="{ type: 'transparent', color: 'primary'}" :class="['sm:hidden', navIsHidden ? 'text-inherit' : '']" @click="toggleNavigation">
        <PhList size="30" class="fill-current" />
      </AppButton>
    </div>
    <AppDropdown content-position="left-bottom">
      <template #button>
        <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
      </template>
      <template #content>
        <div class="flex flex-col gap-2 p-3 bg-secondary-100 dark:bg-secondary-900 border-secondary-200 dark:border-secondary-800">
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
@import './LayoutHeader.scss';
</style>