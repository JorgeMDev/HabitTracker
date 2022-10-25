import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Test = () => {
    const [data, setData] = useState("");

    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/test')
        .then((res)=>{
            setData(res.data)
            console.log(res.data)
        })
    },[])

  return (
    <div>
        <p style={{color: 'blue'}}>Data from backend {data}</p>
    </div>
  )
}

export default Test