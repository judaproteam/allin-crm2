// 'use client'

import Icon from '../Icon'

export default function Upload() {
  return (
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
          <button className="btn-grp">בחר מגלריה</button>
        </div>
      </div>
    </main>
  )
}

const btnStyle = { 'anchor-name': '--anchor-upload' } as React.CSSProperties
const popStyle = {
  'position-anchor': '--anchor-upload',
  top: 'anchor(bottom)',
  right: 'anchor(50%)',
  transform: 'translateX(50%)',
} as React.CSSProperties
