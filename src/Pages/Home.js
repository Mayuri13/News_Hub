import React from 'react'
import News from '../Components/News'

export default function Home() {
  const apiKey = process.env.REACT_APP_NEWS_API
  return (
    <>
      <div className="container-fluid bg-dark text-white d-flex justify-content-center align-items-center flex-column" style = {{height: "45vh"}}>
        <h2 style={{fontSize:"50px", color:"rgb(187 246 96)"}}>News Hub</h2>
        <h5 className='my-2'>Your trusted source for the latest headlines, delivered with unparalleled depth and speed.</h5>
      </div>
      <News apiKey={apiKey} pageSize = {16}/>
    </>
  )
}
