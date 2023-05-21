import { Dialog } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setOpenModal, setOpenRegisterModal } from '../../redux/slices/UserSlice'
import LoginForm from './Login'
import SignupForm from './Signup'

function WrapAuthForm() {
  const isOpenModal = useSelector((state: RootState) => state.user.isOpenModal)
  const isOpenRegisterModal = useSelector((state: RootState) => state.user.isOpenRegister)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setOpenModal(false))
    dispatch(setOpenRegisterModal(false))

  }
  return (
    <Dialog open={isOpenModal} onClose={handleClose} sx={{zIndex: '1000'}}>
      {
        !isOpenRegisterModal ? <LoginForm /> : <SignupForm />
      }
    </Dialog>
  )
}

export default WrapAuthForm