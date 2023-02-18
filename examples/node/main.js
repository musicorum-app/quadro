import { Quadro } from '../../dist/index.js'
import fs from 'fs'
import skiaCanvas from '@napi-rs/canvas'

const canvas = skiaCanvas.createCanvas(400, 600)
const ctx = canvas.getContext('2d')

main()
  .then(() => {
    const image = canvas.toBuffer('image/png')
    fs.writeFileSync('out.png', image)
  })

async function main () {
  const quadro = new Quadro(ctx, skiaCanvas)
  const img = await quadro.loadImage('https://images.unsplash.com/photo-1614107311389-78a20cbb6c9f?auto=format&fit=crop&w=1350&q=80')

  quadro.fillStyle = 'white'
  quadro.fillRect(0, 0, canvas.width, canvas.height)

  quadro.fillStyle = 'red'
  quadro.xAlign = 'middle'

  quadro.fillRect(200, 10, 180, 180)

  quadro.fillStyle = 'blue'

  quadro.font = '40px "Arial"'
  quadro.textAlign = 'center'
  quadro.writeTextLine('Text overflow test', 200, 230, 70)

  quadro.xAlign = 'center'
  quadro.imageFit = 'contain'
  console.log(img)
  quadro.drawImage(img, quadro.width / 2, 250, quadro.width * 0.8, 330)

  quadro.blurArea(quadro.width / 2, 240, 230, 290, 8)
}
