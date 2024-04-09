import React from 'react'

export default function BreadCrumbs({children, className}) {
    console.log(children)
  return (
    <div id="breadCrumbs" className={`my-7 flex  items-center text-white text-3xl ${className}`}>
        
        {children.map((child, index) =>
            <div key={index} className='flex'>
                {child}
                {index + 1 != children.length ?  <i className="fa-solid fa-angle-right text-[2rem] mx-5 flex items-center justify-center"></i> : null}
            </div>)}
      </div>
  )
}
