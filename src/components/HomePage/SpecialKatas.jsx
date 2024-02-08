
import KataCarousel from "./KataCarousel";



export default function SpecialKatas() {


  const FilterButton = () => {
    return (
      <div>

      </div>
    )
  }


  return (
    <div id="conatainer" className="w-full">
      <p id="title" className="4xs:text-2xl text-quaternary mx-5 p-5 font-semibold">Endless learning</p>

      <div id="containerSlider" className=" flex justify-center items-center " >

        <KataCarousel />

      </div>



    </div>
  )
}
