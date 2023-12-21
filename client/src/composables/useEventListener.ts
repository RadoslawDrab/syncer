import { onMounted, onUnmounted } from 'vue'

const useEventListener = <T extends EventTarget>(
  target: T,
  event: keyof HTMLElementEventMap,
  callback: (event: Event) => void
) => {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}

export default useEventListener
