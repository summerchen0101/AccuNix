export interface Menu {
  label: string
  icon?: string
  path: string | null
  subs?: Menu[]
  code?: string
}

export const menuList: Menu[] = [
  // { label: '首頁', path: '/', icon: 'fa-home', code: 'Home' },
  {
    label: '組織管理',
    path: null,
    icon: 'fa-users',
    subs: [
      { label: '編輯組織', path: '/', code: '' },
      { label: '角色管理', path: '/', code: '' },
      { label: '使用者管理', path: '/', code: '' },
    ],
  },
  {
    label: '聊天機器人',
    path: null,
    icon: 'fa-comments',
    subs: [
      { label: 'Line', path: '/line', code: 'Line' },
      { label: 'Facebook', path: '/facebook', code: 'Facebook' },
      { label: 'API Token', path: '/token', code: 'Token' },
    ],
  },
  { label: '一對一聊天', path: '/', icon: 'fa-comment-dots', code: '' },
  { label: '問卷管理', path: '/', icon: 'fa-file-signature', code: '' },
  {
    label: '智慧客服',
    path: null,
    icon: 'fa-headset',
    subs: [{ label: '知識庫列表', path: '/', code: '' }],
  },
]
