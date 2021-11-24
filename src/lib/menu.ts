export interface Menu {
  label: string
  icon?: string
  path: string | null
  subs?: Menu[]
  code?: string
}

export const menuList: Menu[] = [
  { label: '首頁', path: '/', icon: 'fa-home', code: 'Home' },
  {
    label: '聊天機器人',
    path: null,
    icon: 'fa-comments',
    subs: [
      { label: 'Line', path: '/line', code: 'Line' },
      { label: 'Facebook', path: '/facebook', code: 'Facebook' },
    ],
  },
]
