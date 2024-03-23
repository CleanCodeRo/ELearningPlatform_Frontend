import { Option, Select } from '@material-tailwind/react'
import React from 'react'

export default function DropdownFilter({ onChangeEvent, options, values , label }) {
    return (
        <Select label={label} onChange={onChangeEvent}>
            {options.map((category, index) => (
                <Option key={index} value={category}>{category}</Option>
            ))}
        </Select>
    )
}
