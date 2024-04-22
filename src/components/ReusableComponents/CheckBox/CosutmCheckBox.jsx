import React from 'react'
import'./Checkbox.css'

export default function CosutmCheckBox({idNumber, checkBoxEvent, defaultChecked, checkBoxRef}) {
    return (
        <div id={idNumber} className="checkbox-wrapper ">
            <input ref={checkBoxRef} defaultChecked={defaultChecked} onChange={checkBoxEvent} id={`_checkbox-${idNumber}`} type="checkbox"/>
            <label htmlFor={`_checkbox-${idNumber}`}>
                <div className="tick_mark "></div>
            </label>
        </div>


    )
}
