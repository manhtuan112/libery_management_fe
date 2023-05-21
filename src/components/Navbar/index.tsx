import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setLogin, setOpenModal } from '../../redux/slices/UserSlice'
import { RootState } from '../../redux/store'
import Swal from 'sweetalert2'

function ResponsiveAppBar() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const usename = useSelector((state: RootState) => state.user.username)
  const isLogin = useSelector((state: RootState) => state.user.isLogin)

  const handleOpen = () => {
    dispatch(setOpenModal(true))
  }

  const handleLogout = () =>{
    Swal.fire({
      icon: 'question',
      title: 'Do you want to logout?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setLogin({username: '', id: '', isLogin: false}))
        nav('/')
      } 
    })
    
  }
  return (
    <AppBar position='fixed' sx={{zIndex: 999}}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                fontSize: '25px',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white'
              }}
            >
              <MenuBookRoundedIcon sx={{ display: { xs: 'none', md: 'flex', fontSize: '42px' }, mr: 1 }} />
              LIBERY MANAGEMENT
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 0 }}>
            {!isLogin ? (
              <Button variant='contained' color='warning' onClick={handleOpen}>
                Login
              </Button>
            ) : (
              <Typography sx={{ cursor: 'pointer' }}>
                Hello, {usename}{' '}
                <Button variant='contained' color='warning' onClick={handleLogout} sx={{ ml: 2 }}>
                  Logout
                </Button>
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
