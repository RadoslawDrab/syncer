<script setup lang='ts'>
  import { ref, watch } from 'vue';
  import type { AppButtonProps } from './AppButton.vue';

  const props = defineProps<AppToggleProps>()
  const emit = defineEmits<AppToggleEmits>()

  const toggle = ref<boolean>(props.defaultState)

  watch(toggle, () => {
    emit('toggle', toggle.value)
    toggle.value ? emit('on') : emit('off')
  })

  function onToggle() {
    toggle.value = !toggle.value
  }

  interface AppToggleProps extends AppButtonProps {
    defaultState?: boolean
    size?: number
  }
  type AppToggleEmits = {
    toggle: [value: boolean],
    on: [],
    off: []
  }

</script>

<template>
  <div @click="onToggle" :class="['toggle', !toggle ? 'active' : '']">
    <input type="checkbox" :checked="toggle" class="hidden" />
    <div class="knob knob-primary">
      <slot v-if="toggle" name="on">
        <slot></slot>
      </slot>
      <slot v-else name="off">
        <slot></slot>
      </slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import './AppToggle.scss';
</style>