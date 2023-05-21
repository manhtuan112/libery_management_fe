import React from 'react'
import Navbar from '../components/Navbar'
import { Box } from '@mui/material'
import {useState} from 'react';

interface Props {
  children: React.ReactNode
  window?: () => Window
}

function MainLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <Box component='main' sx={{ p: 4, pt: 10 }} >
        {children}
      </Box>
    </div>
  )
}

export default MainLayout
