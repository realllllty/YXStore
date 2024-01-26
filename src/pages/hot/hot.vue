import { onLoad } from '@dcloudio/uni-app'; ; /src/pages/hot/hot.vue
<script setup lang="ts">
import { ref } from 'vue'

// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]

// uniapp获取页面参数
const query = defineProps<{ type: string }>()
const currUrlMap = hotMap.find((v) => {
  return v.type === query.type
})
// 动态设置标题
uni.setNavigationBarTitle({ title: currUrlMap!.title })

import { onLoad } from '@dcloudio/uni-app'

// 推荐封面图
const bannerPicture = ref('')
// 推荐选项
import type { SubTypeItem } from '../../types/hot'
const subTypes = ref<(SubTypeItem & { finish?: boolean })[]>([])
// 高亮下标index
const activeIndex = ref(0)
// 获取热门推荐数据
import { getHotRecommendAPI } from '../../services/hot'
const getHotRecommendData = async () => {
  const res = await getHotRecommendAPI(currUrlMap!.url, {
    // 通过vite, 环境变量控制, 方便测试
    page: import.meta.env.ENV ? 30 : 1,
    pageSize: 10,
  })
  bannerPicture.value = res.result.bannerPicture
  // 后端返回的可能没有finish字段
  subTypes.value = res.result.subTypes
}

// 页面加载
onLoad(() => {
  getHotRecommendData()
})

// 滚动触底
const onscrollToLower = async () => {
  // 获取当前选项
  const currsubTypes = subTypes.value[activeIndex.value]
  // 分页的条件
  if (currsubTypes.goodsItems.page < currsubTypes.goodsItems.pages) {
    // 实现当前页码的累加
    currsubTypes.goodsItems.page++
  } else {
    currsubTypes.finish = true
    uni.showToast({
      title: '没有更多数据了',
      icon: 'none',
    })
    return
  }
  // api call
  const res = await getHotRecommendAPI(currUrlMap!.url, {
    subTypes: currsubTypes.id,
    page: currsubTypes.goodsItems.page,
    pageSize: currsubTypes.goodsItems.pageSize,
  })
  // 新的列表选项
  const newsubTypes = res.result.subTypes[activeIndex.value]
  // 数组追加
  currsubTypes.goodsItems.items.push(...newsubTypes.goodsItems.items)
}
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        v-for="(item, index) in subTypes"
        :key="item.id"
        class="text"
        :class="{ active: index === activeIndex }"
        @tap="activeIndex = index"
      >
        {{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      scroll-y
      v-for="(item, index) in subTypes"
      v-show="activeIndex === index"
      :key="item.id"
      class="scroll-view"
      @scrolltolower="onscrollToLower"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}}`"
        >
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ item.finish ? '没有更多数据了' : '正在加载...' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  // 设置行高为容器的高度实现垂直居中
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
