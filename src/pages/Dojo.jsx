import React from 'react'
import SideHeader from '../components/SideHeader'
import KataCarousel from '../components/HomePage/SpecialKatas/KataCarousel';
import { useAtom } from 'jotai';
import state from "../components/Atom";
import { Link } from 'react-router-dom';
import FilterKataList from '../components/HomePage/SpecialKatas/FilterKataList';

export default function Dojo() {

  return (

    <div className="h-screen select-none flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar" >
      <SideHeader />

      <div className="flex flex-col px-5" style={{ minWidth: "calc(100vw - 5rem)"  }}>
        {/*title */}
        <FilterKataList />
        
          
          <a id='addKata' href='dojo/addKata' className='bg-green-300 mt-4 w-fit'>Add Kata</a>
      
        {/* infinite kata */}
        
        <KataCarousel />

      </div>
    </div>




  );
}


{/* <div className='select-none flex flex-row text-sixth w-full h-full'>
      <SideHeader />
      <div id='dojo' className=' w-[100px] h-full flex-grow flex flex-col'>
        <KataCarousel />


        <Link

          to={"\addKata"}>
          <button id='addKata' className='bg-green-300 mt-4'>

            Add Kata</button>
        </Link>
        <Link

          to={"\deleteKata"}>

          <button id='removeKata' className='bg-red-300 mt-4'>Remove Kata</button>
        </Link>

      </div>


    </div> */}