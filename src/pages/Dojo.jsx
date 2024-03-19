import React from 'react'
import SideHeader from '../components/SideHeader';
import FilterKataList from '../components/SpecialKatas/FilterKataList';
import ListKata from '../components/SpecialKatas/ListKata';

export default function Dojo() {

  return (
    <div className="h-screen select-none flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar" >
      <SideHeader />

      <div className="flex flex-col px-5" style={{ minWidth: "calc(100vw - 5rem)"  }}>
        {/*title */}
        <FilterKataList />
        
          
          <a id='addKata' href='/home/dojo/addKata' className='bg-green-300 mt-4 w-fit'>Add Kata</a>
      
        {/* infinite kata */}
        
        <ListKata/>

      </div>
    </div>




  );
}
