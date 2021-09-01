import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'dashboard',
    title: 'รายงาน',
    type: 'item',
    icon: 'bar-chart',
    url: 'dashboard'
  },
  {
    id: 'admin',
    title: 'ผู้ดูแลระบบ',
    type: 'item',
    icon: 'user-check',
    url: 'admin'
  },
  {
    id: 'user',
    title: 'สมาชิก',
    type: 'item',
    icon: 'user',
    url: 'user'
  },
  {
    id: 'deposit',
    title: 'รายการฝากเงิน',
    type: 'item',
    icon: 'plus-square',
    url: 'deposit'
  },
  {
    id: 'withdraw',
    title: 'รายการถอนเงิน',
    type: 'item',
    icon: 'minus-square',
    url: 'withdraw'
  },
  {
    id: 'invest',
    title: 'รายการลงทุน',
    type: 'item',
    icon: 'trending-up',
    url: 'invest'
  },
  {
    id: 'package',
    title: 'แพ็คเกจลงทุน',
    type: 'item',
    icon: 'dollar-sign',
    url: 'package'
  },
  {
    id: 'banking',
    title: 'บัญชีฝากเงิน',
    type: 'item',
    icon: 'book',
    url: 'banking'
  },
]
