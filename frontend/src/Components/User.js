import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../style.css'
import { url } from '../Utils/url'
function User(props) {
  const [msg, setMsg] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))

  const unReadMsg = (msgs)=>{
    var New = 0;
    for(var i in msgs){
      if(msgs[i].reciever === user._id && msgs[i].isRead === false){
        New++;
      }
    }
    return New

  }

  useEffect(()=>{
    const fetchData = async ()=>{
      const data = await axios.post(url+'/chat/',{sender: user._id, reciever:props.data._id })
      console.log(msg)
      setMsg(data.data)
    } 
    fetchData()
  },[msg])
  return (
    <Link to={'/chat/'+props.data._id} >
    <div className='row-static d-flex  align-center bordered rounded p-1' >
        <div className='col-4'>
            <img src={url+'/images/'+props.data.photo} alt='' className='size-50 object-cover circle'/>
        </div>
        <div className='col-6'>
            <p>{props.data.name}</p>
            { unReadMsg(msg) > 0 ? <p style={{fontSize:12,color:'#222', marginTop:10}}>New Messages <span className='badge'>{unReadMsg(msg)}</span></p> :    <p style={{fontSize:12,color:'#222', marginTop:10}}>{msg.length > 0 ? (msg[msg.length-1].sender === user._id ? 'You: ' +msg[msg.length-1].msg : props.data.name +": " +msg[msg.length-1].msg ): 'Not Msg yet'} </p>
  }
                </div>

        <div className='col-2'>
            <p style={{color: props.data.isOnline ? '#44c0ff' : '#ff3400'}}>{props.data.isOnline ? 'Online' : 'Offline'}</p>
        </div>
    </div>
    </Link>
  )
}

export default User