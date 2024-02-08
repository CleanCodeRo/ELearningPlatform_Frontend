import FilterButton from "./HomePage/FilterButton";


export default function Category(){


    return(
        <div className="grid grid-cols-1">
            <h1 className="4xs:text-2xl text-quaternary p-5 mx-5 font-semibold">
            Categories
            </h1>
            <div id="CATTEGORY" className="flex flex-wrap gap-2">
                <FilterButton image="images/oni_5807989.png" title={"Kyu"} text={""} />
                <FilterButton image="images/oni_5807989.png" title={"Fundamentals"} text={""} />
                <FilterButton image="images/oni_5807989.png" title={"Mathematics"} text={""} />
                <FilterButton image="images/oni_5807989.png" title={"Algorithms"} text={""} />
                <FilterButton image="images/oni_5807989.png" title={"Logic"} text={""} />
                <FilterButton image="images/oni_5807989.png" title={"New"} text={""} />
                <FilterButton image="images/oni_5807989.png" title={"KOTD"} text={""} />
            </div>
        </div>
        



    );

}