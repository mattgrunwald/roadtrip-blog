import fs from 'fs'
import path from 'path'

const convertToBase64 = (imgPath: string) => {
  try {
    const data = fs.readFileSync(imgPath)
    const extensionName = path.extname(imgPath)
    const base64Image = data.toString('base64')

    return `data:image/${extensionName.split('.').pop()};base64,${base64Image}`
  } catch (err) {
    throw err
  }
}

export function convertImages(urls: any) {
  return urls.map((url: string) =>
    convertToBase64(`public/images/preview/${url}`),
  )
}

export function convertImages2(day: number | string) {
  const fileNames = fs
    .readdirSync(`public/images/day/${day}`)
    .filter((file) => file !== 'preview')
  return fileNames.map((name: string) => ({
    src: `/images/day/${day}/${name}`,
    preview: convertToBase64(`public/images/day/${day}/preview/${name}`),
  }))
}

export type GalleryImageSource = {
  src: string
  preview: string
}
