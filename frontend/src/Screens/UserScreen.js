import axios from 'axios'
import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'
import User from '../Components/User'
import '../style.css'
import { url } from '../Utils/url'
function UserScreen() {
    
    const data = JSON.parse(localStorage.getItem('user'))
    const [users , setUsers] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await axios.get(url+'/users/')
            setUsers(res.data)
        }
        fetchData()
    } , [users])

    const navigate = useNavigate()
    const logout = async ()=>{
        await axios.post(url+'/users/logout' , {id: data._id})
        localStorage.removeItem('user')
        navigate('/')
    }
  return (
    <div style={{width:'100%', height:'100vh' , boxSizing: 'border-box'}} className="d-flex justify-center align-centers">
        <div className='container bordered ' style={{width: '50%',}}>
            <div className='row-static p-2 m-2 d=flex align-center divider shadow rounded'>
                <div className='col-3'>
                    <img src={url+'/images/'+data.photo} className="size-70 circle object-cover" alt={data.photo}/>
                </div>

                <div className='col-6'>
                    <p><strong>{data.name}</strong></p>
                </div>

                <div className='col-3'>
                    <button onClick={logout} className='btn btn-red'>Log Out</button>
                </div>
            </div>

            <div className='p-2 m-2'>
                {
                    users.map((x)=> x.email === data.email ? '' : <User key={x._id} data={x} />)
                }
            </div>

        </div>
    </div>
  )
}

export default UserScreen