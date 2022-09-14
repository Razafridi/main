import React from 'react'

function Error(props) {
  return (
    <div style={{opacity:0.8}} className='btn-red p-1 my-1 rounded'>
        <p style={{opacity:1}}>{props.msg}</p>
    </div>
  )
}

export default Error