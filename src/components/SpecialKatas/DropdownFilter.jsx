import { Option, Select } from '@material-tailwind/react'
import React from 'react'

export default function DropdownFilter({ onChangeEvent, options, label, value }) {
    return (
        <Select value={value} label={label} onChange={onChangeEvent}>
            {options.map((category, index) => (
                <Option key={index} value={category}>{category}</Option>
            ))}
        </Select>
    )
}
