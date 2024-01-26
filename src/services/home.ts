import { http } from '@/utils/http'
import type { BannerItem, CategoryItem, GuessItem, HotItem } from '@/types/home.d.ts'
import type { PageResult, PageParams } from '@/types/global'

// distributionSite能够指示类型吧, 1就是首页, 2就是商品分类页
/**
 *
 * @param distributionSite
 * @returns
 * 首页广告区域
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}

/**
 * 首页前台分类
 */

export const getHomeCategoryAPI = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category',
  })
}

/**
 * 首页热门推荐小程序
 */
export const getHomeHotAPI = () => {
  return http<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}

/**
 *
 * @returns
 * 首页猜你喜欢
 */
export const getHomeGoodsGuessLikeAPI = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
