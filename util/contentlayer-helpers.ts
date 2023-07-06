import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

async function generatePreview(imgPath: string) {
  try {
    const extensionName = path.extname(imgPath)
    const raw = fs.readFileSync(imgPath)
    const buffer = await sharp(raw).resize(10, 10).toBuffer()
    const base64Image = buffer.toString('base64')

    return `data:image/${extensionName.split('.').pop()};base64,${base64Image}`
  } catch (err) {
    throw err
  }
}

export async function convertImages(day: number | string) {
  const fileNames = fs.readdirSync(`public/images/day/${day}`)

  const res = []
  for (const name of fileNames) {
    const src = `/images/day/${day}/${name}`
    const preview = await generatePreview(`public/${src}`)
    res.push({ src, preview })
  }
  return res
}

export type GalleryImageSource = {
  src: string
  preview: string
}
