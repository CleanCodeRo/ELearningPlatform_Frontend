import { Input } from '@material-tailwind/react'
import React from 'react'

export default function CostumInput({id, label, inputRef, costumInputClass, color, icon }) {
  return (
    <div id={id} className="relative w-full min-w-[200px]">
      <Input
        color={color}
        icon={icon}
        label={label}
        inputRef={inputRef}
        className={`${costumInputClass} `}
      />
    </div>
  )
}
