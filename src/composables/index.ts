import type { XtxGuessInstance } from '@/types/component'
import { ref } from 'vue'

/**
 *
 * @returns 猜你喜欢组合式函数
 */
export const useGuessList = () => {
  // 获取猜你喜欢组件实例
  const guessRef = ref<XtxGuessInstance>()

  // 滚动触底事件
  const onScrollToLower = () => {
    guessRef.value?.getMore()
  }

  // 返回ref和事件处理函数
  return {
    guessRef,
    onScrollToLower,
  }
}
