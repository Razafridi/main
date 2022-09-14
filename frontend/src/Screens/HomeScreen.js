import React, { useEffect, useState } from 'react'
import Error from '../Components/Error'
import axios from 'axios'
import { url } from '../Utils/url'
import '../style.css'
import { Link , useNavigate} from 'react-router-dom'
function HomeScreen() {
    const navigate = useNavigate()
    
    const [error , setError] = useState('')

    const [user ,setUser] = useState({
        email : '',
        password : '',
    })

    const login = async (e)=> {
        e.preventDefault()
        const res = await axios.post(url+'/users/login' , user)
        if(res.status === 200){
            localStorage.setItem('user' , JSON.stringify(res.data[0]))
            navigate('/users')
        }else if(res.status === 201){
            setError(res.data.error)
        }
        console.log(res)
    }



    useEffect(()=> {
        
        if(localStorage.getItem('user')){
            navigate('/users')
        }
    } , [localStorage.getItem('user')])
  return (
    <div style={{width:'100%', height:'100vh' , boxSizing: 'border-box'}} className="d-flex justify-center align-centers">
        <div className='container'>
            <form onSubmit={login} className='bordered rounded p-2 d-flex flex-column'>
                <input onChange={(e)=> setUser({...user , email:e.target.value })} className='input' placeholder='Email'/>
                <input type='password' onChange={(e)=> setUser({...user , password:e.target.value })} className='input' placeholder='Password' />
                    {
                        error !== '' ? <Error msg={error} /> : ''
                    }
                <button className='btn btn-green'>Sign In</button>

                <p className='m-2'><Link to='/register' >Register Now</Link></p>
            </form>
        </div>
    </div>
  )
}

export default HomeScreen