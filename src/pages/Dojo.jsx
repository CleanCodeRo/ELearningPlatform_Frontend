import React from 'react'
import SideHeader from '../components/SideHeader';
import ListKata from '../components/SpecialKatas/ListKata';
import { useAtom } from 'jotai';
import state from '../components/Atom';
import FilterKata from '../components/SpecialKatas/FilterKata';

export default function Dojo() {
  const [user, setUser] = useAtom(state.user)

  return (
    <div className="h-screen select-none flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar" >
      <SideHeader />

      <div className="flex flex-col px-7" style={{ minWidth: "calc(100vw - 5rem)" }}>
        <div id="titleAndAddKata" className='flex gap-5 items-center'>
          <h1 id="title" className='text-first text-[3.5rem] my-5 font-ninja tracking-widest'>DOJO</h1>

          {user && user.role == "ADMIN" ?
            <a id="beginTraining" className="text-sixth bg-fifth w-10 h-10 text-center font-bold flex items-center justify-center rounded-full " href='/dojo/addKata'>
             <i className="fa-solid fa-plus"></i>
            </a>
            :
            null
          }
        </div>

        <FilterKata />

        <ListKata />

      </div>
    </div>




  );
}
