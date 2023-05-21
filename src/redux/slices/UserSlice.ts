import { UserState } from '../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState: UserState = {
  id: '',
  username: '',
  isLogin: false,
  isOpenModal: false,
  isOpenRegister: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.isLogin = action.payload.isLogin
    },
    setOpenModal: (state, action) => {
      state.isOpenModal = action.payload
    },
    setOpenRegisterModal: (state, action) => {
      state.isOpenRegister = action.payload
    }
  }
})

export const { setLogin, setOpenModal, setOpenRegisterModal } = userSlice.actions
export default userSlice.reducer
