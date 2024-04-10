import React from 'react'

export default function BreadCrumbs({children, className}) {

  return (
    <div id="breadCrumbs" className={`my-7 flex  items-center  text-3xl ${className}`}>        
        {children.map((child, index) =>
            <div key={index} className='flex'>
                {child}
                {children[index + 1] != null ?  <i className="fa-solid fa-angle-right text-[2rem] mx-5 flex items-center justify-center"></i> : null}
            </div>)}
      </div>
  )
}
