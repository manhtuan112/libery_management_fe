import { BookItem } from '../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: BookItem[] = []

const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    getBookList: (state, action) => {
      state = [...action.payload]
    },
  }
})

export const { getBookList } = BookSlice.actions
export default BookSlice.reducer
