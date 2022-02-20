import { ProductType } from './enum'

export interface Menu {
  label: string
  icon?: string
  path: string | null
  subs?: Menu[]
  code?: string
}

export const menuList: Menu[] = [
  {
    label: '數據總覽',
    path: '/dashboard',
    icon: 'fas fa-chart-bar',
    code: 'dashboard',
  },
  {
    label: '好友管理',
    path: null,
    icon: 'fas fa-user-friends',
    subs: [
      { label: '好友管理', code: 'xx', path: '/' },
      { label: '標籤管理', code: 'xx', path: '/' },
      { label: '身份認證', code: 'xx', path: '/' },
      { label: 'Line受眾管理(Beta)', code: 'xx', path: '/' },
      { label: '會員中心(Beta)', code: 'xx', path: '/' },
    ],
  },
  {
    label: '訊息與選單',
    path: null,
    icon: 'far fa-file-alt',
    subs: [
      { label: '機器人主選單', code: 'xx', path: '/' },
      { label: '排程任務', code: 'xx', path: '/' },
      { label: '關鍵字庫', code: 'xx', path: '/' },
      { label: '常用訊息庫', code: 'xx', path: '/' },
      { label: '自動回應設定', code: 'xx', path: '/' },
    ],
  },
  {
    label: '行銷與活動',
    path: null,
    icon: 'fas fa-search-dollar',
    subs: [
      { label: '賀卡製作模組', code: 'xx', path: '/' },
      { label: '票券活動(Beta)', code: 'xx', path: '/' },
      { label: '好友推薦活動', code: 'xx', path: '/' },
      { label: '好有渠道導流活動', code: 'xx', path: '/' },
      { label: '問券管理', code: 'xx', path: '/' },
      { label: '自動化行銷', code: 'xx', path: '/' },
      { label: '粉絲頁貼文回覆', code: 'xx', path: '/' },
    ],
  },
  {
    label: '一對一聊天',
    path: '/',
    icon: 'far fa-comment-dots',
    code: 'managerOneToOne',
  },
  {
    label: '智慧客服',
    path: null,
    icon: 'fas fa-robot',
    subs: [
      { label: '智慧客服腳本', code: 'xx', path: '/' },
      { label: '知識庫腳本', code: 'xx', path: '/' },
    ],
  },
  {
    label: 'API',
    path: null,
    icon: 'fas fa-code-branch',
    subs: [
      { label: 'Open API', code: 'xx', path: '/' },
      { label: 'Callback API 腳本', code: 'xx', path: '/' },
      { label: 'API Token', code: 'xx', path: '/' },
    ],
  },
  {
    label: '組織管理',
    path: null,
    icon: 'fas fa-users-cog',
    subs: [
      { label: '編輯組織', path: '/', code: 'managerOrganization' },
      { label: '使用者管理', path: '/', code: 'managerUser' },
      { label: '角色管理', path: '/', code: 'managerRole' },
      { label: '簡訊用量', path: '/', code: 'xx' },
    ],
  },
]
