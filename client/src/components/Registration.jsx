import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import './Registration.css'

const Registration = () => {
    const [firstName , SetFirstName] = useState('')
    const [lastName, SetLastName] = useState('')
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')
    const [confirmPass, SetConfirmPass] = useState('')

    const [errors, SetErrors] = useState([])

    const navigate = useNavigate()

    
    

    const handleSubmit = (e) => {
    
        //Validation
        e.preventDefault()

        if (password != confirmPass){
            if (!errors.includes('Password Does Not Match'))
            {
            SetErrors([...errors,'Password Does Not Match'])
            navigate("/registration")
            }
        }

        if (firstName.length < 3){
            if (!errors.includes('First name must be at least 3 characters long'))
            {
            SetErrors([...errors, 'First name must be at least 3 characters long'])
            navigate("/registration")
            }
        }

        if (firstName.length < 3){
            if (!errors.includes('Last name must be at least 3 characters long'))
            {
            SetErrors([...errors, 'Last name must be at least 3 characters long'])
            navigate("/registration")
            }
        }

        if (!/\S+@\S+\.\S+/.test(email)){
            SetErrors([...errors, 'Invalid Email'])
            navigate("/registration")
        }

        
        axios.post('/registration', {first_name: firstName, last_name: lastName, email, password})
        .then(res =>{
            console.log(res.data)
            navigate('/dashboard')
        })
        .catch(err=>err.response.data)
    }


  return (
    <div>
        <h1>Registration</h1>
        <Link to="/"  style={{color: 'red', margin: "5%"}}>Home</Link>
        
        <form onSubmit={handleSubmit}>
            <div className='container'>
            <div>
                <label name="firstName">First Name:</label>
                <input type='text' onChange={(e)=>SetFirstName(e.target.value)}/>
            </div>
            <div>
                <label name="lastName">Last Name:</label>
                <input type='text' onChange={(e)=>SetLastName(e.target.value)}/>
            </div>
            <div className='email'> 
                <label name="email">Email:</label>
                <input type='email' onChange={(e)=>SetEmail(e.target.value)}/>
            </div>
            <div className='password'>
                <label name="password">Password:</label>
                <input type='password' onChange={(e)=>SetPassword(e.target.value)}/>
            </div>
            <div >
                <label name="password" className='confirm'>Confirm Password:</label>
                <input type='password' onChange={(e)=>SetConfirmPass(e.target.value)}/>
            </div>
            </div>
            <button className='btn' type='submit'>Submit</button>
        </form>
        {
            errors.map((eachError,i)=>{
                return (
                    <h5 key={i} style={{color: 'red'}}>{eachError}</h5>
                )
            })
        }
    </div>
  )
}

export default Registration