import { Input } from '@material-tailwind/react'
import React from 'react'

export default function CostumInput({ id, label, inputRef, defaultValue, costumInputClass, color, icon, onChange }) {
  return (
    <div className="relative w-full min-w-[200px]">
      <Input
        id={id}
        color={color}
        icon={icon}
        label={label}
        defaultValue={defaultValue}
        inputRef={inputRef}
        variant='standard'
        className={`${costumInputClass} `}
        onChange={onChange}
      />
    </div>
  )
}
