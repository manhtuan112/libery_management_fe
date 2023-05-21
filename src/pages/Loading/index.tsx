import React from 'react'
import './style.css'

function Loading() {
  return (
    <div className='loader'>
      <div className='book'>
        <figure className='page'></figure>
        <figure className='page'></figure>
        <figure className='page'></figure>
      </div>
      <h1 className='loading'>Loading</h1>
    </div>
  )
}

export default Loading
