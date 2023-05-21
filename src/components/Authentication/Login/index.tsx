import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react'
import { setLogin, setOpenModal, setOpenRegisterModal } from '../../../redux/slices/UserSlice'
import { Button, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'

function LoginForm() {
  const dispatch = useDispatch()

  const [showErrorTextUsername, setshowErrorTextUsername] = useState(false)
  const [showErrorTextPassword, setshowErrorTextPassword] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleClose = () => dispatch(setOpenModal(false))
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    
    if (!password.trim() || !username.trim()) {
      if (!username.trim()) setshowErrorTextUsername(true)
      else setshowErrorTextUsername(false)
      if (!password.trim()) setshowErrorTextPassword(true)
      else setshowErrorTextPassword(false)
    } else {
      const data = {
        username,
        password
      }
      try {
        const res = await axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/user/login/',
          data: JSON.stringify(data),
          headers: {
            'Content-Type': `application/json`
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'Goods',
          text: res.data.message
        })
        dispatch(setLogin({ ...res.data.data, isLogin: true }))

        handleClose()
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Oh no!!',
          text: 'Username or password is incorrect!'
        })
        setshowErrorTextPassword(false)
        setshowErrorTextUsername(false)
      }
    }
  }
  return (
    <>
      <DialogTitle sx={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold' }}>Login</DialogTitle>
      <DialogContent sx={{ p: 4, pb: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            
            error={showErrorTextUsername}
            label='Username'
            value={username}
            helperText={showErrorTextUsername ? 'Not empty this field' : ''}
            onChange={(event) => setUsername(event.target.value)}
            margin='dense'
            fullWidth
          />

          <TextField
            
            error={showErrorTextPassword}
            label='Password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin='dense'
            fullWidth
            helperText={showErrorTextPassword ? 'Not empty this field' : ''}
          />
        </form>
      </DialogContent>

      <Typography sx={{ px: 4, pb: 1, textAlign: 'end', fontSize: '14px' }}>
        Don't have account?{' '}
        <a
          style={{ color: '#3883ce', fontWeight: 'bold', textDecoration: 'none' }}
          href='#'
          onClick={() => dispatch(setOpenRegisterModal(true))}
        >
          Sign up
        </a>
      </Typography>
      <DialogActions>
        <Button variant='contained' color='error' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='contained' onClick={handleSubmit}>
          Login
        </Button>
      </DialogActions>
    </>
  )
}

export default LoginForm
