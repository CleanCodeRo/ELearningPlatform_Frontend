import React from 'react'
import'/src/components/CheckBox/Checkbox.css'

export default function CheckBox({idNumber, checkBoxEvent, defaultChecked, checkBoxRef}) {
    return (
        <div className="checkbox-wrapper ">
            <input ref={checkBoxRef} defaultChecked={defaultChecked} onChange={checkBoxEvent} id={`_checkbox-${idNumber}`} type="checkbox"/>
            <label htmlFor={`_checkbox-${idNumber}`}>
                <div className="tick_mark "></div>
            </label>
        </div>


    )
}
