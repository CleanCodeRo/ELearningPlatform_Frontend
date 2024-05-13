import React, { useEffect, useRef, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import SuccessError from '../ReusableComponents/SuccessError';
import setCanvasPreview from './setCanvasPreview';
import { data } from 'autoprefixer';

const minDimension = 25;
const aspectRatio = 1;
const minPixelDimension = 125

export default function UploadPfp({ setOpenUploadPfp, pfpImageRef }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  })
  const [error, setError] = useState(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);


  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalHeight < minPixelDimension || naturalWidth < minPixelDimension) {
          setError("Photo must be min 125px !");
          setTimeout(() => {
            setError(null)
          }, 2000)
          return setImageSrc(null);
        }
      })

      setImageSrc(imageUrl)
      pfpImageRef.current.name = file.name
      pfpImageRef.current.type = file.type
    })
    reader.readAsDataURL(file);
  }

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
   // const cropWidthPercent = (minDimension / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 25,
      },
      aspectRatio,
      width,
      height
    );
    const centerdCrop = centerCrop(crop, width, height)
    setCrop(centerdCrop);
  }

  const cropPhoto = () =>{
    setCanvasPreview(imageRef.current, canvasRef.current, convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height))
    let dataUrl = canvasRef.current.toDataURL()
    pfpImageRef.current.src = dataUrl
    setOpenUploadPfp(false)
  }
 

  return (
    <div id='uploadScreenContainer' className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-10 '>
      <div id='uploadContainer' className='relative w-[30rem] min-h-[80%] bg-white rounded-xl p-7 '>
        <SuccessError error={error} />
        <i onClick={() => setOpenUploadPfp(false)} className="fa-solid fa-xmark absolute right-4 top-4 w-6 h-6 flex justify-center items-center hover:bg-generalColors-light-gray rounded-lg mr-1"></i>

        <input onChange={onSelectFile} type="file" accept="image/*" className="block w-fit text-sm text-slate-500 ml-3 mb-3
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-generalColors-dark-blue file:text-white
        hover:file:bg-generalColors-medium-blue"/>

        {imageSrc &&
          <div className='flex flex-col items-center'>
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => {
                setCrop(percentCrop)
              }}
              circularCrop
              keepSelection
              aspect={aspectRatio}
              minWidth={minDimension}>
              <img ref={imageRef} alt='upload' src={imageSrc} onLoad={onImageLoad} draggable="false" />
            </ReactCrop>

            <button id="cutPhoto"
              className="px-7 py-3 bg-generalColors-dark-blue text-generalColors-white font-semibold mt-10  rounded-xl"
              onClick={cropPhoto}
              >
              Crop Image
            </button>
          </div>}

        {crop &&
          <canvas ref={canvasRef} className='mt-3 hidden' style={{ border: "1px solid black", objectFit: "contain", width: 150, height: 150 }}/>
        }
      </div>
    </div>

  )
}
