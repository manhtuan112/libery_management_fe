import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useState } from 'react'
import { setOpenModal, setOpenRegisterModal } from '../../../redux/slices/UserSlice'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'

function SignupForm() {
  const isOpenModal = useSelector((state: RootState) => state.user.isOpenModal)
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRePssword] = useState('')
  const [dateofbirth, setDateofbirth] = useState('')

  const [showusernameError, setShowUsernameError] = useState(false)
  const [showfullnameError, setShowFullnameError] = useState(false)
  const [showemailError, setShowEmailError] = useState(false)
  const [showphoneError, setshowPhoneError] = useState(false)
  const [showpasswordError, setshowPasswordError] = useState(false)
  const [showrepasswordError, setshowRePsswordError] = useState({ status: false, content: '' })
  const [showdateofbirthError, setshowDateofbirthError] = useState(false)

  const handleClose = () => {
    dispatch(setOpenModal(false))
    dispatch(setOpenRegisterModal(false))
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (
      !username.trim() ||
      !fullname.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password.trim() ||
      !repassword.trim() ||
      !dateofbirth
    ) {
      if (username.trim()) setShowUsernameError(false)
      else setShowUsernameError(true)

      if (fullname.trim()) setShowFullnameError(false)
      else setShowFullnameError(true)

      if (email.trim()) setShowEmailError(false)
      else setShowEmailError(true)

      if (phone.trim()) setshowPhoneError(false)
      else setshowPhoneError(true)

      if (password.trim()) setshowPasswordError(false)
      else setshowPasswordError(true)

      if (repassword.trim()) setshowRePsswordError({ status: false, content: '' })
      else setshowRePsswordError({ status: true, content: 'Not empty this field' })

      if (dateofbirth) setshowDateofbirthError(false)
      else setshowDateofbirthError(true)
    } else if (password.trim() !== repassword.trim()) {
      setshowRePsswordError({ status: true, content: 'password and repassword are not same' })
      setShowUsernameError(false)
      setShowFullnameError(false)
      setShowEmailError(false)
      setshowPhoneError(false)
      setshowPasswordError(false)
      setshowDateofbirthError(false)
    } else {
      console.log('Username:', username)
      console.log('Password:', password)
      const data = {
        name: fullname,
        username,
        email,
        password,
        phone,
        dateOfBirth: dateofbirth
      }
      try {
        const res = await axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/user/register/',
          data: JSON.stringify(data),
          headers: {
            'Content-Type': `application/json`
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'Goods',
          text: res.data.message + ', please return login form and login',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(setOpenRegisterModal(false))
            setshowRePsswordError({ status: false, content: '' })
            setShowUsernameError(false)
            setShowFullnameError(false)
            setShowEmailError(false)
            setshowPhoneError(false)
            setshowPasswordError(false)
            setshowDateofbirthError(false)
          } else {
            setshowRePsswordError({ status: false, content: '' })
            setShowUsernameError(false)
            setShowFullnameError(false)
            setShowEmailError(false)
            setshowPhoneError(false)
            setshowPasswordError(false)
            setshowDateofbirthError(false)
          }
        })
      } catch (e) {
        Swal.fire({
          icon: 'error',
          title: 'Oh no!!',
          text: 'Username or email already exists, please another username'
        })
        setshowRePsswordError({ status: false, content: '' })
        setShowUsernameError(false)
        setShowFullnameError(false)
        setShowEmailError(false)
        setshowPhoneError(false)
        setshowPasswordError(false)
        setshowDateofbirthError(false)
      }
    }
  }
  return (
    <>
      <DialogTitle sx={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold' }}>Sign up</DialogTitle>
      <DialogContent sx={{ p: 4, pb: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            error={showfullnameError}
            helperText={showfullnameError ? 'Not empty this field' : ''}
            label='Fullname'
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
            margin='dense'
            fullWidth
          />

          <TextField
            error={showusernameError}
            helperText={showusernameError ? 'Not empty this field' : ''}
            label='Username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            margin='dense'
            fullWidth
          />

          <TextField
            error={showemailError}
            helperText={showemailError ? 'Not empty this field' : ''}
            label='Email'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin='dense'
            fullWidth
          />

          <TextField
            error={showphoneError}
            helperText={showphoneError ? 'Not empty this field' : ''}
            label='Phone'
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            margin='dense'
            fullWidth
          />

          <TextField
            error={showdateofbirthError}
            helperText={showdateofbirthError ? 'Not empty this field' : ''}
            focused
            label='Date of birth'
            value={dateofbirth}
            type='date'
            onChange={(event) => setDateofbirth(event.target.value)}
            margin='dense'
            fullWidth
          />

          <TextField
            error={showpasswordError}
            helperText={showpasswordError ? 'Not empty this field' : ''}
            label='Password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin='dense'
            fullWidth
          />
          <TextField
            error={showrepasswordError.status}
            helperText={showrepasswordError.status ? showrepasswordError.content : ''}
            label='Re-Password'
            type='password'
            value={repassword}
            onChange={(event) => setRePssword(event.target.value)}
            margin='dense'
            fullWidth
          />
        </form>
      </DialogContent>

      <Typography sx={{ px: 4, pb: 1, textAlign: 'end', fontSize: '14px' }}>
        Are you have account?{' '}
        <a
          style={{ color: '#3883ce', fontWeight: 'bold', textDecoration: 'none' }}
          href='#'
          onClick={() => dispatch(setOpenRegisterModal(false))}
        >
          Login
        </a>
      </Typography>
      <DialogActions>
        <Button variant='contained' color='error' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='contained' onClick={handleSubmit}>
          Sign up
        </Button>
      </DialogActions>
    </>
  )
}

export default SignupForm
