import axios from 'axios'
import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import "./Login.css" 

const Login = () => {
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')

    const [error, SetError] = useState('')

    const navigate = useNavigate()

    const iconlink = "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-turtle-tropical-flaticons-lineal-color-flat-icons.png"

    

    const handleSubmit = (e) =>{
        e.preventDefault()

        const user = {email:email , password: password}

        axios.post('/login', user)
        .then(res => {
            console.log(res.data)
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err.response.data)
            SetError(err.response.data)
        })
    }
 


  return (
    <div>
        <div className='title'>
            <img src={iconlink}></img>
            <h1>Turtle Habit</h1>
        </div>
        <div className='container'>
        <form onSubmit={handleSubmit}>
            <div>
            <label name='email'>Email:</label>
            <input type='text' name='email' placeholder='Email' onChange={(e)=>SetEmail(e.target.value)}/>
            </div>
            <div>
            <label name='password'>Password:</label>
            <input type='password' name='password' placeholder='Password' onChange={(e)=>SetPassword(e.target.value)}/>
            </div>
            <button className='btn' type='submit'>Login</button>
        </form>
        </div>
        <div style={{marginTop: 10}}>
            <Link to='/registration' style={{color: 'red', margin: "5%", margin: 50}}>Not a user? Sign Up</Link>
        <p className='quote'>Forming a new habit is a marathon, not a sprint.</p>
        </div>
        <p style={{color: 'red'}}>{error}</p>
    </div>
  )
}

export default Login