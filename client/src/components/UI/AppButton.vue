<script setup lang='ts'>
  import type { ButtonStyle } from 'types/button';
  
  const props = defineProps<AppButtonProps>()

  const buttonClassName = ['btn', props.buttonStyle && props.buttonStyle.type !== 'default' ? `btn-${props.buttonStyle.type}-${props.buttonStyle.color}` : '']

  interface AppButtonProps {
    buttonStyle?: ButtonStyle
  }

</script>

<template>
  <button :class="buttonClassName">
    <slot>Button</slot>
  </button>
</template>

<style scoped lang='scss'>
  
</style>