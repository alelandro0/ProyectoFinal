// import React from 'react'
import '../styles/loading.css'

const Loading = () => {
  return (
    <div className='loading' style={{position:'fixed', height:'100%', width:'100%',textAlign:'center', zIndex:'5',
    backgroundColor:'#0008', color:'white', top:'0', left:'0'}}>
      <svg width='400' height='180' >
         <rect x='50' y='20' width='150' height='150'
         fill='none'stroke='white'strokeWidth='5'/>
         <text style={{transform:'translate(49px, -40px)'}} className='loading-text' fill='#FFF' x='4' y='147'>Loading</text>
      </svg>
    </div>
  )
}

export default Loading
