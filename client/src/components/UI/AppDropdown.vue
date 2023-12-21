<script setup lang='ts'>
  import { computed, ref } from 'vue';

  import type { Position, HorizontalPosition, VerticalPosition } from 'types/index'

  const props = defineProps<AppDropdownProps>()

  const id = ref<string>('button-dropdown-' + crypto.randomUUID())
  const contentIsShown = ref<boolean>(false)
  const contentPosition = computed(() => {
    if(!props.contentPosition) return null
    const horizontal = props.contentPosition.split('-')[0] as HorizontalPosition
    const vertical = props.contentPosition.split('-')[1] as VerticalPosition

    type PositionStyleType<T> = {
      type: Omit<T, 'center'>,
      value: string
    }
    let x: PositionStyleType<HorizontalPosition>[], y: PositionStyleType<VerticalPosition>[];

    switch(horizontal) {
      case 'center': {
        x = [{
          type: 'left',
          value: '50%'
        }, {
          type: 'transform',
          value: 'translateX(-50%)'
        }]
        break
      }
      default: {
        x = [{
          type: horizontal === 'left' ? 'right' : 'left',
          value: '0%'
        }]
        break
      }
    }
    switch(vertical) {
      case 'center': {
        y = [{
          type: 'top',
          value: '50%'
        }, {
          type: 'transform',
          value: 'translateY(-50%)'
        }]
        break
      }
      default: {
        y = [{
          type: vertical === 'top' ? 'bottom' : 'top' ,
          value: '100%'
        }]
        break
      }
    }
    return {...getStyles(x), ...getStyles(y)}

    // Creates CSS styles
    function getStyles(array: PositionStyleType<HorizontalPosition | VerticalPosition>[]) {      
      return array.reduce((acc, item) => ({...acc, [item.type as unknown as string]: item.value}), {})
    }
  })
  
  function toggleDropdown() {
    contentIsShown.value = !contentIsShown.value
  }
  function onFocusOut(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement | null
    
    // Checks if user clicked inside of the dropdown. If so then doesn't hide content
    if(relatedTarget && relatedTarget?.closest(`#${id.value}`) !== null) return

    contentIsShown.value = false
  }
  
  interface AppDropdownProps {
    contentPosition?: Position
  }
</script>

<template>
  <div :id="id" class="button-dropdown" @focusout.stop="onFocusOut">
    <button @click="toggleDropdown" class="button btn btn-transparent-primary">
      <slot name="button">Button</slot>
    </button>
    <div v-show="contentIsShown" class="content" :style="contentPosition">
      <slot name="content">Content</slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.button-dropdown {
  @apply relative;
  .button {
    @apply rounded-full p-0;
  }
  .content {
    @apply absolute flex flex-col;
  }
}
.v-enter-active,
.v-leave-active {
  @apply transition-all duration-500;
}
.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}
</style>
