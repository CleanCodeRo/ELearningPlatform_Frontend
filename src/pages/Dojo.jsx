import React, { useState } from 'react'
import SideHeader from '../components/SideHeader';
import ListKata from '../components/SpecialKatas/ListKata';
import { useAtom } from 'jotai';
import FilterKata from '../components/SpecialKatas/FilterKata';
import state from '../components/ReusableComponents/Atom';

export default function Dojo() {
  const [user, setUser] = useAtom(state.user);
  const [katas, setKatas] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [loadingKatas, setLoadingKatas] = useState(true);
  const [refreshKatas , setRefreshKatas] = useState(0);

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

        {user && <FilterKata userId={user.id} setKatas={setKatas} setNumberOfPages={setNumberOfPages} setLoadingKatas={setLoadingKatas} refreshKatas={refreshKatas} setRefreshKatas={setRefreshKatas}/>}

        <ListKata katas={katas} numberOfPages={numberOfPages} loadingKatas={loadingKatas} setRefreshKatas={setRefreshKatas}/>

      </div>
    </div>




  );
}
