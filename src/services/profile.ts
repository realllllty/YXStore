// 获取个人信息

import type { ProfileDetail } from '@/types/member'
import { http } from '@/utils/http'

export const getMemberProfileAPI = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}

// 修改个人信息
import type { ProfileParams } from '@/types/member'
export const putMemberProfileAPI = (data: ProfileParams) => {
  return http({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
