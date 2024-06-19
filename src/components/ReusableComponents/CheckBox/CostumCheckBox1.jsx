import { Checkbox } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";

export default function CostumCheckBox1({ checkBoxEvent, checkBoxRef, defaultChecked }) {
    const [checkBoxSelected, setCheckBoxSelected] = useState(false);
    const componentRef = useRef(null)

    useEffect(() => {
        if (defaultChecked) {
            setCheckBoxSelected(true)
        }

        if(checkBoxRef){
            checkBoxRef.current = componentRef.current.firstChild.firstChild
        }

    }, [])

    const fullEvent = () => {
        checkBoxEvent();
        setCheckBoxSelected(!checkBoxSelected)
    }

    return (
        <Checkbox
            style={{ backgroundColor: `${!checkBoxSelected ? "#ffffff" : "#174072"}` }}
            onChange={fullEvent}
            className={`border-2 `}
            ref={componentRef}
            defaultChecked={defaultChecked}
        />
    )
}