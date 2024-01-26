<script setup lang="ts">
import { ref } from 'vue'
import type { BannerItem } from '../types/home'

const activeIndex = ref(0)

const onChange: UniHelper.SwiperOnChange = (e) => {
  // console.log(e.detail?.current)
  // 非空断言操作符(!), 用于告诉ts编译器, 在访问这个变量的属性的时候忽略掉null或者是undifined的这种可能性
  activeIndex.value = e.detail!.current
}
// 定义props
/**
 * Vue 当中使用ts 其中的defineProps 能够传递纯类型参数的方式进行声明
 */
const props = defineProps<{
  list: BannerItem[]
}>()
</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="false" :interval="3000" @change="onChange">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in list"
        :key="item.id"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss">
/* 轮播图 */
.carousel {
  height: 280rpx;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .active {
      background-color: #fff;
    }
  }
  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
