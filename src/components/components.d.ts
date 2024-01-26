/**
 *   .d.ts文件特性
 *   自动包含
 *   IDE集成
 *  */

// src/types/components.d.ts
import XtxSwiper from './XtxSwiper.vue'

// 模块扩展语法, 向vue的类型定义添加额外的内容
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
  }
}
