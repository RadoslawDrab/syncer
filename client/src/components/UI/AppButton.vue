<script setup lang='ts'>
  import type { ButtonStyle } from 'types/button';
  
  const props = defineProps<AppButtonProps>()
  const buttonStyle = props.buttonStyle

  const buttonClassName = buttonStyle ? 
    buttonStyle.type && buttonStyle.type !== 'default' ? 
      `btn-${buttonStyle.type}-${buttonStyle.color}` : 
      `btn-${buttonStyle.color}` 
    : ''  
    
  export interface AppButtonProps {
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