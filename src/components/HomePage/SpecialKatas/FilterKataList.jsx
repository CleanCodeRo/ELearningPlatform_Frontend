import FilterButton from "./FilterButton";



export default function FilterKataList(){


    return(
        <>
        <p className="text-4xl p-4  font-bold  rounded-lg text-fourth">
          Categories
        </p>
        <div id="CATTEGORY" className="w-auto h-auto flex flex-row  items-center">
            
            <FilterButton image="images/oni_5807989.png" title={"Kyu"} text={""} />
            <FilterButton image="images/oni_5807989.png" title={"Fundamentals"} text={""} />
            <FilterButton image="images/oni_5807989.png" title={"Mathematics"} text={""} />
            <FilterButton image="images/oni_5807989.png" title={"Algorithms"} text={""} />
            <FilterButton image="images/oni_5807989.png" title={"Logic"} text={""} />
            <FilterButton image="images/oni_5807989.png" title={"New"} text={""} />
            <FilterButton image="images/oni_5807989.png" title={"KOTD"} text={""} />
        </div>
        </>
        



    );

}