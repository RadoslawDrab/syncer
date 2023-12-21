import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

import type { Theme } from 'types/index'

const useTheme = defineStore('theme', () => {
  const theme = ref<Theme>(
    localStorage.getItem('syncer-theme') ?? matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  )
  watch(
    theme,
    () => {
      localStorage.setItem('syncer-theme', theme.value)
      const htmlElement = document.querySelector('html')
      if (!htmlElement) return
      if (theme.value === 'light') {
        htmlElement.classList.add('light')
        htmlElement.classList.remove('dark')
      } else {
        htmlElement.classList.add('dark')
        htmlElement.classList.remove('light')
      }
    },
    { immediate: true }
  )

  function set(t: Theme) {
    theme.value = t
  }
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { value: theme, set, toggle }
})
export default useTheme
