// upload file
export const uploadImg = async (e) => {
  const file = e.target.files[0]

  const public_id = removeType(file.name)
  const imgUri = (await fileToDataUri(file)) as string

  const img = new Image() as HTMLImageElement
  img.src = imgUri

  const url = await new Promise((resolve) => {
    img.addEventListener('load', () => toWebp(img, public_id, resolve))
  })

  return url
}

async function toWebp(img, public_id, resolve) {
  // SET IMAGE
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const width = 500
  const height = 500 * (img.height / img.width)
  canvas.width = width
  canvas.height = height

  ctx.drawImage(img, 0, 0, width, height)

  // IMAGE RESULT
  const resImg = canvas.toDataURL('image/webp')

  // UPLOAD TO CLOUDINARY
  const fd = new FormData()
  fd.append('file', resImg)
  fd.append('upload_preset', 'ml_default')
  fd.append('public_id', public_id)
  fd.append('folder', 'promos')
  fd.append('tags', 'promo,all')

  let res
  try {
    res = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: fd,
    })
  } catch (error) {
    console.log(error)
  }

  const data = await res.json()

  resolve(data?.secure_url)
}

function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result)
    })

    reader.readAsDataURL(field)
  })
}

const removeType = (name) => {
  const tmp = name.split('.')
  tmp.pop()
  return tmp.join('.')
}

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dankm2tul/upload'
