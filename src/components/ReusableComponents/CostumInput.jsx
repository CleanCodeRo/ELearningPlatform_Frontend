import { Input } from '@material-tailwind/react'
import React from 'react'

export default function CostumInput({id, label, inputRef, defaultValue , costumInputClass, color, icon }) {
  return (
    <div id={id} className="relative w-full min-w-[200px]">
      <Input
        color={color}
        icon={icon}
        label={label}
        defaultValue={defaultValue}
        inputRef={inputRef}
        variant='standard'
        className={`${costumInputClass} `}
      />
    </div>
  )
}
