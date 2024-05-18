
import { Input } from '@material-tailwind/react'
import React from 'react'

export default function CostumInput({ id, label, inputRef, defaultValue, costumInputClass, icon, onChange ,placeholder,disabled}) {


  if(disabled==true){
    label="";
    return (
      <div className={`${costumInputClass} w-full font-xl`}>
        <Input
          id={id}
          size={'md'}
          icon={icon}
          label={label}
          placeholder={placeholder}
          defaultValue={defaultValue}
          inputRef={inputRef}
          variant='standard'
          // className={`${costumInputClass} `}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    )
  }else{
    return (
      <div className={`${costumInputClass} w-full font-xl`}>
        <Input
          id={id}
          size={'md'}
          icon={icon}
          label={label}
          placeholder={placeholder}
          defaultValue={defaultValue}
          inputRef={inputRef}
          variant='standard'
          // className={`${costumInputClass} `}
          onChange={onChange}
          disabled={false}
        />
      </div>
    )
  }
}
