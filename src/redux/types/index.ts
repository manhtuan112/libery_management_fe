export interface UserState {
  id: string
  username: string
  isLogin: boolean
  isOpenModal: boolean
  isOpenRegister: boolean
}

export interface BookItem {
  id?: number
  title: string
  author: string
  category: string
  public_date: string
  page_num?: number
  description?: string
  image_url?:string
}
