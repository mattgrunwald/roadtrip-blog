import fs from 'fs'
import path from 'path'
import sharp, { Metadata } from 'sharp'
import GithubSlugger from 'github-slugger'
import { AboutPage } from '@/.contentlayer/generated'

export type GalleryImageSource = {
  src: string
  preview: string
  day: number
  /**
   * height / width
   */
  ratio: number
  size: Size
}

export type Size = [1, 1] | [2, 1] | [1, 2]
export const sizes: { [k: string]: Size } = {
  NORMAL: [1, 1],
  WIDE: [2, 1],
  TALL: [1, 2],
}

export async function convertImages(
  day: number | string,
): Promise<GalleryImageSource[]> {
  const fileNames = fs.readdirSync(`public/images/day/${day}`)

  const res = []
  for (const name of fileNames) {
    const src = `/images/day/${day}/${name}`
    const { preview, ratio } = await generatePreview(`public/${src}`)
    res.push({
      src,
      preview,
      ratio,
      day: Number(day),
      size: sizeImage(ratio),
    })
  }
  return res
}

export function sizeImage(ratio: number): Size {
  let size: Size
  if (ratio > 1) {
    size = sizes.TALL
  } else if (ratio < 0.5) {
    size = sizes.WIDE
  } else {
    size = sizes.NORMAL
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

export type Heading = {
  level?: number
  text?: string
  slug?: string
}

export async function generateHeadings(doc: AboutPage) {
  const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
  // rehypeSlug plugin for contentlayer uses GithubSlugger under the hood, so the generated slugs here will match the contentlayer generated slugs
  const slugger = new GithubSlugger()
  const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
    ({ groups }) => {
      const flag = groups?.flag
      const content = groups?.content
      return {
        level: flag?.length,
        text: content,
        slug: content ? slugger.slug(content) : undefined,
      }
    },
  )
  return headings
}
