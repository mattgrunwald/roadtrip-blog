import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import GithubSlugger from 'github-slugger'
import { AboutPage } from '@/.contentlayer/generated'

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

export type AboutPageHeading = {
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
