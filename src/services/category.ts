import { http } from '@/utils/http'
import { CategoryTopItem } from '@/types/category.d.ts'
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
