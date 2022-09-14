import React from 'react'

function Msg(props) {
  return (
    <div style={{display:'inline-block', maxWidth:'300px', background: props.var === 'me' ? '#00c8ff' : '#ffffff',color: props.var === 'me' ? '#ffffff' : '#222222', marginLeft: props.var === 'me' ? '50%' : '20px',  marginRight: props.var === 'you' ? '50%' : '20px', }} className='shadow p-1 m-1'>
        <p>{props.content}</p>
    </div>
  )
}

export default Msg