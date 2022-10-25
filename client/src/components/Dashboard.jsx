import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import './Dashboard.css'



const Dashboard = () => {
  const [firstName, SetFirstName] = useState('')
  const [lastName, SetLastName] = useState('')
  const [email, SetEmail] = useState('')
  const [habits, SetHabits] = useState([])
  const [rerender, SetRerender] = useState(false)

  const [newHabit, SetNewHabit] = useState('')

  const iconlink = "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-turtle-tropical-flaticons-lineal-color-flat-icons.png"

  const navigate = useNavigate()

  useEffect(()=>{
    axios.get("/user/habits")
    .then(res=>{
      console.log(res)
      SetHabits(res.data)

    })
    .catch(err=>{
      console.log(err)
      navigate('/')
    })

    axios.get("/get/user")
    .then(res=>{
      console.log(res)
      SetFirstName(res.data.first_name)
      SetLastName(res.data.last_name)
      SetEmail(res.data.email)

    })
    .catch(err=>{
      console.log(err)
    })


  },[rerender])

  const handleLogout = (e) =>{
    e.preventDefault()

    axios.get('/logout')
    .then(res=>console.log(res))
    .catch(err=>console.log(err))

    navigate('/')

  }

  const handleAdd = (e) =>{
    e.preventDefault()

    if (newHabit.length < 3){
      alert('New Habit should be more than 3 characters')
    }
  
    axios.post(`/new/habit`, {name : newHabit, streak: 0})
      .then(res=>{
        console.log(res.data)
        SetRerender(!rerender)
        SetNewHabit('')
      
      })
      .catch(err=>{
        console.log(err)
      })
  }

  const handleDelete = (deleteId) => {
    axios.post(`/delete/habit`, {id : deleteId})
      .then(res=>{
      console.log(res)
      filterList(deleteId)
    })
      .catch(err=>{
      console.log(err)
    })
    
  }

  function filterList(deleteId){
    const updatedList = habits.filter((eachHabit)=>deleteId!==eachHabit['habits.id'])
    SetHabits(updatedList)
  }

  const handleCheck = (habitId) => {
    console.log('updating streak')
    axios.post('/update/habit', {id : habitId})
      .then(res=>{
      console.log(res)
      SetRerender(!rerender)
      })
      .catch(err=>{
        console.log(err)
      })
  }



 

  return (
    <div>
      <div className='title'>
        <img src={iconlink} alt="" />
        <h1>Dashboard</h1>
      </div>
      <div className='d-flex'>
        <h3>Welcome {firstName} {lastName}!</h3>
        <button className='logout' onClick={handleLogout}>Logout</button>
      </div>
      <div className='d-flex'>
        <label>New Habit!</label>
        <input type="text" value={newHabit} onChange={(e)=>{SetNewHabit(e.target.value)}}/>
        <button  className='btn' onClick={handleAdd}>Add</button>
      </div>
      

      <table>
       <thead>
        <tr>
          <th>Habit</th>
          <th>Streak</th>
          <th>Actions</th>
          <th>Start Date</th>
          <th>Last Updated</th>
        </tr>
        </thead>
        <tbody>
          
          { habits.length > 0?
            habits.map((eachHabit, i)=>{
              return (
                <tr key={i} style={eachHabit.streak === "66"?{textDecoration: 'line-through'}:{textDecoration:'none'}}>
                  <td>{eachHabit.name}</td>
                  <td>{eachHabit.streak} / 66</td>
                  <td><img className='img1' onClick={()=>handleDelete(eachHabit['habits.id'])} src="https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/64/000000/external-trash-user-interface-febrian-hidayat-gradient-febrian-hidayat.png"/>
                  { eachHabit.streak === "66"?
                  <button className='btn' onClick={()=>handleCheck(eachHabit['habits.id'])} disabled></button>:
                  <img onClick={()=>handleCheck(eachHabit['habits.id'])} className='img1' src="https://img.icons8.com/external-those-icons-flat-those-icons/24/000000/external-Check-interface-those-icons-flat-those-icons-2.png"/>
                  }
                  </td>
                  <td className='date'>{moment(eachHabit['habits.created_at']).format('ddd LT')} </td>
                  <td className='date'>{moment(eachHabit["habits.updated_at"]).format('ddd LT')} </td>
                  
                </tr>
              )

            }) : <tr><td>Start new habit</td></tr>
          }
        
        </tbody>


      </table>

      <h5>Habit Fact:</h5>
      <h5>On average, it takes more than 2 months before a new behavior becomes automatic — 66 days to be exact. <a href='https://jamesclear.com/new-habit' style={{color: "red"}}>Read more.</a></h5>

    </div>
  )
}

export default Dashboard