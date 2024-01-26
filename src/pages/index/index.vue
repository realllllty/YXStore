<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '../../services/home'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home.d.ts'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'
import type { XtxGuessInstance } from '@/types/component'
import PageSkeleton from '@/pages/index/components/PageSkeleton.vue'

// 需要在页面加载的时候进行一次调用
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

// 是否正在加载
const isLoading = ref(false)
// 页面加载的时候调用
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})

const onScrolltoLower = () => {
  guessRef.value?.getMore()
}

// 获取猜你喜欢组件实例
const guessRef = ref<XtxGuessInstance>()

// 下拉刷新
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  isTriggered.value = true
  // 发送请求
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotData()
  // 先重置后调用
  guessRef.value?.resetData()
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore(),
  ])
  isTriggered.value = false
}
</script>

<template>
  <CustomNavbar />
  <!-- 使用竖向滚动时，需要给 <scroll-view> 一个固定高度，通过 css 设置 height -->
  <scroll-view
    :refresher-enabled="true"
    @refresherrefresh="onRefresherrefresh"
    scroll-y
    @scrolltolower="onScrolltoLower"
    :refresher-triggered="isTriggered"
  >
    <PageSkeleton v-if="isLoading"></PageSkeleton>
    <template v-else>
      <XtxSwiper :list="bannerList"></XtxSwiper>
      <CategoryPanel :list="categoryList"></CategoryPanel>
      <HotPanel :list="hotList"></HotPanel>
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
