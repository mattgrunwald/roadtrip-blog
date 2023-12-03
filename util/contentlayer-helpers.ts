import fs from 'fs'
import path from 'path'
import sharp, { Metadata } from 'sharp'
import { GalleryImageSource, Size, sizes } from './types'

export async function convertImages(
  day: number | string,
): Promise<GalleryImageSource[]> {
  const fileNames = fs.readdirSync(`public/images/day/${day}`)

  const res = []
  for (const name of fileNames) {
    const src = `/images/day/${day}/${name}`
    const { preview, ratio } = await generatePreview(`public/${src}`)
    const size = sizeImage(ratio)
    const [colSpan, rowSpan] = sizes[size]
    res.push({
      src,
      preview,
      ratio,
      day: Number(day),
      size,
      rowSpan,
      colSpan,
      alt: parseAltText(name),
    })
  }
  return res
}

function sizeImage(ratio: number): Size {
  let size: Size
  if (ratio > 1) {
    size = Size.Tall
  } else if (ratio < 0.5) {
    size = Size.Wide
  } else {
    size = Size.Normal
  }
  return size
}

async function generatePreview(imgPath: string) {
  try {
    const extensionName = path.extname(imgPath)
    const raw = fs.readFileSync(imgPath)
    const buffer = await sharp(raw).resize(10, 10).toBuffer()
    const base64Image = buffer.toString('base64')

    const { width, height } = getNormalSize(await sharp(raw).metadata())

    return {
      preview: `data:image/${extensionName
        .split('.')
        .pop()};base64,${base64Image}`,
      ratio: height! / width!,
    }
  } catch (err) {
    throw err
  }
}

function getNormalSize({ width, height, orientation }: Metadata) {
  return (orientation || 0) >= 5
    ? { width: height, height: width }
    : { width, height }
}

const fileNameRegex = /^(\d|[a-z])+_(.+)\.([a-zA-Z0-9])?/
const separatorRegex = /_/g
export function parseAltText(fileName: string) {
  const rawText = fileNameRegex.exec(fileName)
  return (rawText ? rawText[2] : '').replace(separatorRegex, ' ')
}
