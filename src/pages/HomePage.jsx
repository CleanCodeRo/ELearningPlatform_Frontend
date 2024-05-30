import React from "react";
import Modules from "../components/HomePage/Modules";
import SideHeader from "../components/SideHeader";
import { useAtom } from "jotai";
import KatasOfTheDay from "../components/HomePage/KatasOfTheDay/KatasOfTheDay";
import state from "../components/ReusableComponents/Atom";
import { Helmet } from "react-helmet";

function HomePage() {
  const [user, setUser] = useAtom(state.user)
  
  return (
    <div className="h-screen flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar bg-generalColors-dark-blue text-gray-100">
      <Helmet>
        <meta charSet="utf8"/>
        <title>Home - CleanCodeQuest</title>
      </Helmet>

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
