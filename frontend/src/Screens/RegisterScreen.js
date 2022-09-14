import React, { useState } from 'react'
import Error from '../Components/Error'
import axios from 'axios'
import { url } from '../Utils/url'
import { Link } from 'react-router-dom'
import '../style.css'
function RegisterScreen() {
    const [error , setError] = useState('')

    const [user ,setUser] = useState({
        name: '',
        email : '',
        password : '',
        photo: ''
    })

    const register = async (e)=> {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name" , user.name)
        formData.append("email" , user.email)
        formData.append("password" , user.password)
        formData.append("photo" , user.photo)
        const res = await axios.post(url+'/users/register' , formData)
        if(res.status === 200){
            setError("Successfully Register")
        }else if(res.status === 201){
            setError(res.data.error)
        }
        console.log(res)
    }
  return (
    <div style={{width:'100%', height:'100vh' , boxSizing: 'border-box'}} className="d-flex justify-center align-centers">
        <div className='container'>
            <form onSubmit={register} className='bordered rounded p-2 d-flex flex-column'>
                <input onChange={(e)=> setUser({...user , name:e.target.value })} className='input' placeholder='Name'/>
                <input onChange={(e)=> setUser({...user , email:e.target.value })} className='input' placeholder='Email'/>
                <input type='password' onChange={(e)=> setUser({...user , password:e.target.value })} className='input' placeholder='Password' />
                <input type='file' onChange={(e)=> setUser({...user , photo:e.target.files[0] })} className='input' placeholder=''/>
              
                    {
                        error !== '' ? <Error msg={error} /> : ''
                    }
                <button className='btn btn-green'>Sign Up</button>
                <p className='m-2'><Link to='/' >Have an Account</Link></p>
            </form>
        </div>
    </div>
  )
}

export default RegisterScreen