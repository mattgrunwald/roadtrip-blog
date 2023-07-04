import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

function log(message) {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(message);
}

async function generatePreview(imgPath) {
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

async function generatePreviews() {
  const previews = {}
  const days = fs.readdirSync(`public/images/day`)
  for (const day of days) {
    log(`generating preview for day ${day}...`)
    const dayPath = `public/images/day/${day}`
    const fileNames = fs
      .readdirSync(dayPath)

    for (const name of fileNames) {
      const imgPath = `${dayPath}/${name}`
      const data = await generatePreview(imgPath)
      previews[`${day}/${name}`] = data
    }
  }
  console.log('')

  fs.writeFileSync('previews.json', JSON.stringify(previews))
}

await generatePreviews()
