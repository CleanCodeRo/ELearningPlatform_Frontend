import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect() {
 const navigate = useNavigate();

 useEffect(() =>{
     console.log("refirect")
    navigate("/")
 },[])

  return (
    <div></div>
  )
}
