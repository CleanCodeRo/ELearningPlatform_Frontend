
import Modules from "../components/HomePage/Modules";
import SpecialKatas from "../components/HomePage/SpecialKatas";
import SideHeader from "../components/SideHeader";
import FilterButtons from "../components/Category";

function HomePage() {
  return (
    <div className="select-none flex flex-row text-quaternary">
      <SideHeader />
      <div className="flex flex-col w-[95%] md:mx-[5rem]">
        <Modules />
        <FilterButtons/>
        {/* strica inaltimea screen pe homepage fix sau inlocuite cu alt carusel hmmmmm.........*/}
        {/* <SpecialKatas />  */}
      </div>
    </div>
  );
}

export default HomePage;
