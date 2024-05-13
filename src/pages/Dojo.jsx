import React, { useState } from 'react'
import SideHeader from '../components/SideHeader';
import ListKata from '../components/SpecialKatas/ListKata';
import { useAtom } from 'jotai';
import FilterKata from '../components/SpecialKatas/FilterKata';
import state from '../components/ReusableComponents/Atom';
import { Link } from 'react-router-dom';

export default function Dojo() {
  const [user, setUser] = useAtom(state.user);
  const [katas, setKatas] = useState(null);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [loadingKatas, setLoadingKatas] = useState(true);
  const [refreshKatas, setRefreshKatas] = useState(0);

  return (
    <div className="h-screen flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar" >
      <SideHeader />

      <div className="flex flex-col px-7" style={{ minWidth: "calc(100vw - 5rem)" }}>
        <div id="titleAndAddKata" className='flex  items-center'>
          {/* <h1 id="title" className='text-first text-[3.5rem] my-5 font-ninja tracking-widest'>DOJO</h1> */}
          <p className="text-3xl sm:text-4xl font-bold text-fourth text-generalColors-dark-blue px-4 my-5">Dojo</p>

          {user && user.role === "ADMIN" && (
            <Link
              to="/dojo/addKata"
              className="h-10 w-10 rounded-full text-generalColors-dark-blue flex items-center justify-center text-xl hover:bg-[#2c8dfe] hover:text-generalColors-white"
            >
              <i className="fa-solid fa-plus"></i>
            </Link>
          )}
        </div>

        {user && <FilterKata userId={user.id} setKatas={setKatas} setNumberOfPages={setNumberOfPages} setLoadingKatas={setLoadingKatas} refreshKatas={refreshKatas} setRefreshKatas={setRefreshKatas} />}

        <ListKata katas={katas} numberOfPages={numberOfPages} loadingKatas={loadingKatas} setRefreshKatas={setRefreshKatas} />

      </div>
    </div>




  );
}
