import React from "react";
import DropdownFilter from "./DropdownFilter";

import { kataCategories, kataDifficulty, kataProgress } from "./FilterObjects";
export default function FilterKata() {

    return (
        <div className="flex flex-row w-full">
            <p className="text-3xl mr-6  font-bold  rounded-lg text-fourth">
                Filters
            </p>
            <div id="CATTEGORY" className="w-full gap-8 flex flex-row justify-around items-center">
                <DropdownFilter onChangeEvent={() => console.log("heh")} options={kataCategories} label="Category"/>
                <DropdownFilter onChangeEvent={() => console.log("heh")} options={kataProgress} label="Status"/>
                <DropdownFilter onChangeEvent={() => console.log("heh")} options={kataDifficulty} label="Difficulty"/>
            </div>
        </div>
    );

}