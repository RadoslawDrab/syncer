import type { App } from 'vue'

import AppDropdown from 'components/UI/AppDropdown.vue'
import AppButton from 'components/UI/AppButton.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    AppButton: typeof AppButton
    AppDropdown: typeof AppDropdown
  }
}

const modules = import.meta.glob('components/**/*.vue')

const register = async (app: App<Element>, prefix: string = 'App'): Promise<void> => {
  for (const path in modules) {
    const componentName = path.split('/').at(-1).split('.')[0]

    if (componentName.match(`${prefix}*`)) {
      const componentConfig = await modules[path]()
      app.component(`${componentName}`, componentConfig.default)
    }
  }
}

export default register
