import React from 'react'
import SideHeader from '../components/SideHeader'
import KataCarousel from '../components/HomePage/SpecialKatas/KataCarousel';
import { useAtom } from 'jotai';
import state from "../components/Atom";

export default function Dojo() {
  
  const [user, setUser] = useAtom(state.user)
  
  
  
  
  
  
    return (
    <div className='select-none flex flex-row text-sixth w-full h-full'>
    <SideHeader />
    <div id='dojo' className=' w-[100px] h-full flex-grow flex flex-col'>
      <KataCarousel user={user} />


     <button id='addKata' className='bg-green-300 mt-4'>Add Kata</button>
     <button id='removeKata' className='bg-red-300 mt-4'>Remove Kata</button>

    </div>
    
    
    </div>
      
    
  );
}
