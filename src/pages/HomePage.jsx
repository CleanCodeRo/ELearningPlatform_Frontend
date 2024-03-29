import React from "react";
import Modules from "../components/HomePage/Modules";
import SideHeader from "../components/SideHeader";
import { useAtom } from "jotai";
import state from "../components/Atom";
import KatasOfTheDay from "../components/HomePage/KatasOfTheDay/KatasOfTheDay";

function HomePage() {
  const [user, setUser] = useAtom(state.user)
  
  return (
    <div className="h-screen select-none flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar">
      <SideHeader />
    
      <div id="moduleAndKataHolder" className="flex flex-col px-7 " style={{ minWidth: "calc(100vw - 5rem)"}}>
       {user && 
       <>
       <Modules userRole={user.role}/>
       <KatasOfTheDay userRole={user.role}/>
       </>
      }
      </div>
    </div>
  );
}

export default HomePage;
