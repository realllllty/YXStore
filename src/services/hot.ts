import { http } from '@/utils/http'
import type { HotItem } from '@/types/home.d'
import type { HotResult } from '@/types/hot'

type HotParams = PageParams & { subType?: string }

/**
 * 通用热门推荐类型
 * @param url
 * @param data
 * @returns
 */
export const getHotRecommendAPI = (url: string, data?: HotParams) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
