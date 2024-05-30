import { Option, Select } from '@material-tailwind/react'
import React from 'react'

export default function DropdownFilter({ onChangeEvent, options, label, value }) {
    return (
        <Select aria-label={label} value={value} label={label} onChange={onChangeEvent}
                variant='standard'>
            {options.map((category, index) => (
                <Option key={index} value={category} aria-label={category}>{category}</Option>
            ))}
        </Select>
    )
}
