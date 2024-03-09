import React from 'react'
import "./CheckBox.css"

export default function CheckBox({idNumber, checkBoxEvent, defaultChecked}) {
    return (
        <div className="checkbox-wrapper ">
            <input defaultChecked={defaultChecked} onChange={checkBoxEvent} id={`_checkbox-${idNumber}`} type="checkbox" />
            <label htmlFor={`_checkbox-${idNumber}`}>
                <div className="tick_mark"></div>
            </label>
        </div>


    )
}
