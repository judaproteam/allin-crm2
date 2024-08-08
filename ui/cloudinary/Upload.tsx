'use client'

import { useState } from 'react'
import Icon from '../Icon'
import { uploadImg } from './uploadImg'

export default function Upload({ className = '' }) {
  const [img, setImg] = useState('/promo.jpg')

  const onFileChange = async (e) => {
    const imgUrl = (await uploadImg(e)) as string

    setImg(imgUrl)
  }

  return (
    <div className={`${className} grid grid-cols-2 gap-6`}>
      <label className="simple-btn bg-white">
        <Icon name="image" type="lit" className="size-5" />
        <p className="">צרף תמונה</p>
        <input type="file" id="file" onChange={onFileChange} className="hidden" />
        <input type="text" readOnly value={img} name="img" className="hidden" />
      </label>
      <img src={img} alt="מבצע" className="size-28 rounded-md" />
    </div>
  )
}
