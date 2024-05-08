import { useAtom } from 'jotai';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import state from './Atom';

export default function Redirect() {
 const navigate = useNavigate();
 const[uer,setUser] = useAtom(state.user);

 useEffect(() =>{
     console.log("redirect")
    navigate("/")
 },[])

  return (
    <div></div>
  )
}
