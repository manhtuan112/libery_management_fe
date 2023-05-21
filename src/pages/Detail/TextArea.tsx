import * as React from 'react'
import { useState, CSSProperties } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { styled } from '@mui/system'

export default function EmptyTextarea({ description, setDescription, status }: any) {



  return (
    <TextareaAutosize
      
    style={{
      width: '90%',
      fontFamily: 'IBM Plex Sans, sans-serif',
      fontWeight: '400',
      lineHeight: '1.5',
      padding: '12px',
      borderRadius: '12px',
      outline: 'none'
    }}
      aria-label='empty textarea'
      
      maxRows={10}
      minRows={7}
      value={description}
      disabled={status === 'view'}
      onChange={(e) => setDescription(e.target.value)}
    />
  )
}
