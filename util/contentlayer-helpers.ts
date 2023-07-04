import fs from 'fs'
const previews: Record<string, string> = require('../previews.json')

export function convertImages(day: number | string) {
  const fileNames = fs
    .readdirSync(`public/images/day/${day}`)
    .filter((file) => file !== 'preview')

  return fileNames.map((name: string) => {
    const src = `/images/day/${day}/${name}`
    const preview = previews[`${day}/${name}`] || ''
    return { src, preview }
  })
}

export type GalleryImageSource = {
  src: string
  preview: string
}
