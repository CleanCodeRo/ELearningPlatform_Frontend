import React from 'react'

export default function ProfilePicture({ openUpload, imageRef, imageSrc }) {
    return (
            <label onClick={openUpload} id="pfpImage" className="w-[200px] h-[200px] bg-white rounded-full flex justify-center items-center relative group">
                <img draggable="false" src="/images/default-picture.png" alt="" className="size-32" />
                <div id="cameraHover" className="hidden group-hover:flex justify-center items-center w-full h-full absolute top-0 left-0 bg-white bg-opacity-70 rounded-full">
                    <img draggable="false" alt='' height={35} width={35} src="/images/camera-dark-blue.png" />
                </div>
                <img draggable="false" alt='' ref={imageRef} className="w-full h-full rounded-full absolute z-10" src={imageSrc} />
            </label>
    )
}
