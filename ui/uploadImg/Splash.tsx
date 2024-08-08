'use client'

import { useEffect, useState } from 'react'
import Icon from '../Icon'

export default function Upload() {
  const [splashImgs, setSplashImgs] = useState([])
  const [term, setTerm] = useState('cat')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const imgs = await getUnsplashImgs(term, page)
      setSplashImgs(imgs)
    }
    fetchData()
  }, [term, page])

  return (
    <>
      <main className="m-6">
        <button className="btn-soft" popoverTarget="uploadPop" style={btnStyle}>
          <Icon name="image" type="reg" className="size-4" />
          <p>צרף תמונה</p>
        </button>
        <div
          popover="auto"
          id="uploadPop"
          style={popStyle}
          className="inset-0 m-0 rounded-full shadow-6">
          <div className="inline-flex gap-1">
            <label className="btn-grp">
              <p>העלה תמונה</p>
              <input type="file" name="file" id="file" className="hidden" />
            </label>
            <button className="btn-grp" popoverTarget="splashPop">
              בחר מגלריה
            </button>
          </div>
        </div>
      </main>

      <div popover="auto" id="splashPop" className="w-11/12 h-5/6 overflow-y-auto pop">
        <div className="columns-5 gap-2 m-1">
          {splashImgs.map((img, i) => (
            <img key={i} src={img} className="w-full rounded my-2 first:mt-0" />
          ))}
        </div>

        {/* onClick={() => nextPage(-1)} */}
      </div>
    </>
  )
}

export const getUnsplashImgs = async (term, page) => {
  const key = 'da956f64c042e140b66c13948b25c071b673beed791e0b33a3fd31d867be620f'
  const baseUrl = 'https://api.unsplash.com//search/photos'

  const res = await fetch(`${baseUrl}?client_id=${key}&page=${page}&query=${term}&per_page=30`)
  const data = await res.json()

  //build the HTML
  let allImages = []
  if (data.total) {
    allImages = data.results.map((img) => img.urls.small)
  }

  return allImages
}

const btnStyle = { 'anchor-name': '--anchor-upload' } as React.CSSProperties
const popStyle = {
  'position-anchor': '--anchor-upload',
  top: 'anchor(bottom)',
  right: 'anchor(50%)',
  transform: 'translateX(50%)',
} as React.CSSProperties
