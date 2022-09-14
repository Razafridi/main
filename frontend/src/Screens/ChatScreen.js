import axios from 'axios'
import React, { useEffect ,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Msg from '../Components/Msg'
import { url } from '../Utils/url'

function ChatScreen() {
    const params = useParams()
    const navigate = useNavigate()
    const [msg, setMsg] = useState('')
    const [chat, setChat] = useState([])
    const data = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState({})
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.post(url+'/users/check', {id : params.id })
            console.log(res)
            setUser(res.data)
        }
        fetchData()

        const fetchMsg = async ()=>{
            const res = await axios.post(url+'/chat/' , {sender : data._id , reciever: user._id})
            console.log(res)
            
            setChat(res.data)
        }

        const markRead = async ()=>{
            const res = await axios.post(url+'/chat/mark',{sender : data._id , reciever: user._id})
        }
        markRead()
        
        fetchMsg()
    } , [user])

    const sendMsg = async (e)=>{
        e.preventDefault()
        const res = await axios.post(url+'/chat/send' , {sender: data._id , reciever: user._id , msg})
        console.log(res)
        setMsg('')
        
    }
  return (
    <div style={{width:'100%', height:'100vh' , boxSizing: 'border-box'}} className="d-flex justify-center align-centers">
        <div className='container bordered ' style={{width: '50%',}}>
            <div style={{background:'#ddd'}} className="row-static align-center">
                <div className='col-2'>
                    <button onClick={()=> navigate('/users')} className='btn btn-green'>Back</button>
                </div>

                <div className='col-3'>
                    <img src={url+'/images/'+user.photo} alt='' className='size-30 object-cover circle' />
                </div>

                <div className='col-5'>
                    <p><strong>{user.name}</strong></p>
                </div>

                <div className='col-2'>
                    <p>{user.isOnline ? "Online" : "Offline"}</p>
                </div>
            </div>


            <div style={{width:'100%',height:'450px', overflow: 'scroll'}} id='sc' className='bordered d-flex flex-column' >
                {
                    chat.map((x)=> <Msg var={x.sender === data._id ? 'me' : 'you'} content={x.msg} />)
                }
            </div>
            <div className='bordered d-flex '>
                <input value={msg} onChange={(e)=> setMsg(e.target.value)} style={{flex:9}} className='input' />
                <button onClick={sendMsg} style={{flex:1}} className='btn btn-blue'>Send</button>
            </div>

        </div>
    </div>
  )
}

export default ChatScreen