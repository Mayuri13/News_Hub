import React from 'react'
import loading from './loading.gif'

export default function Spinner() {
  return (
    <div>
        <img className='my-3' src={loading} style={{height:"10vh"}} alt="loading..." />
    </div>
  )
}
