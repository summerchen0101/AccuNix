export interface Btn {
  title: string
  action: number
  reply: string
}

export interface MsgTextFields {
  content: string
}
export interface MsgBtnFields {
  review: string
  title: string
  content: string
  btns: Btn[]
}

export interface ImgUploadRes {
  organization_id: number
  user_id: number
  type: string
  from: string
  path: string
  updated_at: Date
  created_at: Date
  id: number
}

export interface MsgImgFields {
  file: File
  imgRes?: ImgUploadRes
}
export interface MsgVideoFields {
  file: File
  preview: string
}

export interface CardGroup {
  file: File
  title: string
  content: string
  btns: Btn[]
}

export interface MsgCardGroupFields {
  review: string
  btnCount: number
  groups: CardGroup[]
}

export interface ImgGroup {
  file: File
  title: string
  action: number
  reply: string
}
export interface MsgImgGroupFields {
  review: string
  groups: ImgGroup[]
}
