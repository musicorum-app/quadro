const { Quadro } = require('@musicorum/quadro')

const gebi = id => document.getElementById(id)
const getValueFromId = id => gebi(id).value

const start = async () => {
  const img = await Quadro.loadImageAsync('https://lastfm.freetls.fastly.net/i/u/300x300/d0f5103d593401b6787dff7541274961.png')

  window.resources = {
    img
  }

  gebi('xAlign').onchange = draw
  gebi('yAlign').onchange = draw
  gebi('alignElement').onchange = draw

  draw()
  setupTextLines()
}

const draw = () => {
  drawAlignCanvas(gebi('align'))
}

const drawAlignCanvas = async (canvas) => {
  const ctx = canvas.getContext('2d')
  const quadro = new Quadro(ctx)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const imgSize = 150
  const imgPos = [150, 150]

  quadro.xAlign = getValueFromId('xAlign')
  quadro.yAlign = getValueFromId('yAlign')

  console.log(quadro)

  quadro.fillStyle = 'blue'

  switch (getValueFromId('alignElement')) {
    case 'roundedImage':
      quadro.drawCircleImage(window.resources.img, imgPos[0], imgPos[1], imgSize)
      break
    case 'rect':
      quadro.fillRect(imgPos[0], imgPos[1], imgSize, imgSize)
      break
    case 'image':
      quadro.drawImage(window.resources.img, imgPos[0], imgPos[1], imgSize, imgSize)
      break
  }

  ctx.strokeStyle = 'red'

  // --
  ctx.beginPath()
  ctx.moveTo(imgPos[0] - imgSize, imgPos[1])
  ctx.lineTo(imgPos[0] + imgSize, imgPos[1])
  ctx.stroke()

  // |
  ctx.beginPath()
  ctx.moveTo(imgPos[0], imgPos[1] - imgSize)
  ctx.lineTo(imgPos[0], imgPos[1] + imgSize)
  ctx.stroke()

  quadro.fillStyle = 'green'

  ctx.beginPath()
  ctx.arc(imgPos[0], imgPos[1], 3, 0, 2 * Math.PI)
  ctx.fill()
}

const setupTextLines = () => {
  const canvas = gebi('textLines')
  const ctx = canvas.getContext('2d')
  const quadro = new Quadro(ctx)

  let limit = 0.5
  let dragging = false

  const drawTextLines = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const limitX = canvas.width * limit

    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(~~limitX - 2, 0)
    ctx.lineTo(~~limitX - 2, canvas.height)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(~~limitX + 2, 0)
    ctx.lineTo(~~limitX + 2, canvas.height)
    ctx.stroke()

    quadro.font = '23px sans-serif'
    const textX = 10
    const maxWidth = limitX - textX

    quadro.writeTextLine(getValueFromId('textLinesText'), 10, 40, maxWidth)
  }

  canvas.addEventListener('mousemove', ev => {
    const {
      layerX,
      layerY
    } = ev

    const limitX = canvas.width * limit

    const gap = 6

    const bounds = 30

    if (dragging) {
      if (layerX > bounds && layerX < (canvas.width - bounds)) {
        limit = layerX / canvas.width
        drawTextLines()
      }
    }

    if (layerX > (limitX - gap) && layerX < (limitX + gap)) {
      canvas.classList.add('move-cursor')
    } else {
      canvas.classList.remove('move-cursor')
    }
  })

  canvas.addEventListener('mousedown', ev => {
    dragging = true
  })

  canvas.addEventListener('mouseup', ev => {
    dragging = false
  })

  canvas.addEventListener('mouseleave', ev => {
    dragging = false
  })

  gebi('textLinesText').addEventListener('keypress', () => {
    drawTextLines()
  })

  drawTextLines()

}

start()
