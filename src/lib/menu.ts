export interface Menu {
  label: string
  icon?: string
  path: string | null
  subs?: Menu[]
  code?: string
}

export const botMenus: Menu[] = [
  {
    label: '機器人主選單',
    path: '/inbox/list',
    icon: 'fas fa-border-all',
    code: '',
  },
  {
    label: '自動回應設定',
    path: '/',
    icon: 'far fa-caret-square-left',
    code: '',
  },
  { label: '關鍵字庫', path: '/', icon: 'fab fa-slack-hash', code: '' },
  { label: '排程任務', path: '/', icon: 'far fa-clock', code: '' },
  { label: '好友管理', path: '/', icon: 'far fa-user', code: '' },
  { label: '常用訊息庫', path: '/', icon: 'far fa-comments', code: '' },
  { label: '問券腳本', path: '/', icon: 'far fa-sticky-note', code: '' },
]

export const menuList: Menu[] = [
  // { label: '首頁', path: '/', icon: 'fa-home', code: 'Home' },
  {
    label: '組織管理',
    path: null,
    icon: 'fas fa-users',
    subs: [
      { label: '編輯組織', path: '/', code: '' },
      { label: '角色管理', path: '/', code: '' },
      { label: '使用者管理', path: '/', code: '' },
    ],
  },
  // {
  //   label: '聊天機器人',
  //   path: null,
  //   icon: 'fas fa-comments',
  //   subs: [
  //     { label: 'Line', path: '/line', code: 'Line' },
  //     { label: 'Facebook', path: '/facebook', code: 'Facebook' },
  //     { label: 'API Token', path: '/token', code: 'Token' },
  //   ],
  // },
  { label: '一對一聊天', path: '/', icon: 'fas fa-comment-dots', code: '' },
  { label: '問卷管理', path: '/', icon: 'fas fa-file-signature', code: '' },
  {
    label: '智慧客服',
    path: null,
    icon: 'fas fa-headset',
    subs: [{ label: '知識庫列表', path: '/', code: '' }],
  },
]
