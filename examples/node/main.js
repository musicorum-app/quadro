const { Quadro } = require('@musicorum/quadro')
const { createCanvas } = require('canvas')
const fs = require('fs')

const out = fs.createWriteStream('./out.jpg')

const canvas = createCanvas(400, 600)
const ctx = canvas.getContext('2d')

main()
  .then(() => {
    const stream = canvas.createJPEGStream()
    stream.pipe(out)
  })

async function main () {
  const quadro = new Quadro(ctx)

  quadro.fillStyle = 'white'
  quadro.fillRect(0, 0, canvas.width, canvas.height)

  quadro.fillStyle = 'red'
  quadro.xAlign = 'middle'

  quadro.fillRect(200, 10, 180, 180)

  quadro.fillStyle = 'blue'

  quadro.font = '40px "Arial"'
  quadro.textAlign = 'center'
  quadro.writeTextLine('Text overflow test', 200, 230, 70)
}
