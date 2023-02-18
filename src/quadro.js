import { blurCanvas, resolveAlign } from './utils.js'
import RenderingContextDefaults from './renderingContextDefaults.js'

export class Quadro extends RenderingContextDefaults {
  constructor (context, canvas) {
    super(context)
    this.backendCanvas = canvas
    this.xAlign = 'left'
    this.yAlign = 'top'
    this.textOverflow = 'ellipsis'
    this.imageFit = 'fill'
  }

  writeTextLine (text, x, y, maxWidth) {
    let { width } = this.ctx.measureText(text)

    if (width > maxWidth) {
      while (width > maxWidth) {
        if (text.length <= 3) {
          break
        }

        text = text.slice(0, -2)
        width = this.ctx.measureText(text + '…').width
      }
      this.ctx.fillText(text + '…', x, y)
    } else {
      this.ctx.fillText(text, x, y)
    }
  }

  fillRect (x, y, width, height) {
    const {
      realX,
      realY
    } = resolveAlign(x, y, width, height, this)

    this.ctx.fillRect(realX, realY, width, height)
  }

  // Credits of cover to https://observablehq.com/@severo/image-cover
  drawImage (img, x, y, w, h) {
    const {
      realX,
      realY
    } = resolveAlign(x, y, w, h, this)

    if (this.imageFit === 'fill') {
      return this.ctx.drawImage(img, realX, realY, w, h)
    }

    let {
      width,
      height
    } = img
    let dx, dy

    if (this.imageFit === 'contain') {
      const scale = Math.min(w / width, h / height)
      dx = (w / 2) - (width / 2) * scale
      dy = (h / 2) - (height / 2) * scale

      width *= scale
      height *= scale
      this.ctx.drawImage(img, realX + dx, realY + dy, width, height)
    } else if (this.imageFit === 'cover') {
      let sx, sy, sWidth, sHeight
      const sAspectRatio = width / height
      const dAspectRatio = w / h

      if (sAspectRatio > dAspectRatio) {
        sHeight = height
        sWidth = height * dAspectRatio
        sx = (width - sWidth) / 2
        sy = 0
      } else {
        sHeight = width / dAspectRatio
        sWidth = width
        sx = 0
        sy = (height - sHeight) / 2
      }

      this.ctx.drawImage(img, sx, sy, sWidth, sHeight, realX, realY, w, h)
    }
  }

  drawCircleImage (img, x, y, size = img.width, radius = size * 0.5) {
    const c = this.createCanvas(size, size)
    const rx = c.getContext('2d')

    rx.clearRect(0, 0, size, size)
    rx.globalCompositeOperation = 'source-over'
    rx.drawImage(img, 0, 0, size, size)

    rx.globalCompositeOperation = 'destination-in'
    rx.fillStyle = '#000'
    rx.beginPath()
    rx.arc(size * 0.5, size * 0.5, radius, 0, Math.PI * 2, true)
    rx.closePath()
    rx.fill()

    const {
      realX,
      realY
    } = resolveAlign(x, y, size, size, this)

    this.ctx.drawImage(c, realX, realY, size, size)
  }

  changePixeldata (fn, sx = 0, sy = 0, sw = this.width, sh = this.height) {
    const imData = this.ctx.getImageData(sx, sy, sw, sh)
    const {
      width,
      height,
      data
    } = imData

    let x = 0
    let y = 0

    for (let i = 0; i < data.length; i += 4) {
      const rgba = [data[i], data[i + 1], data[i + 2], data[i + 3]]
      const d = fn({
        rgba,
        pos: [x, y],
        width,
        height
      })
      if (d) {
        data[i] = d[0]
        data[i + 1] = d[1]
        data[i + 2] = d[2]
        data[i + 3] = d[3]
      }

      if (x === width - 1) {
        x = 0
        y++
      } else {
        x++
      }
    }

    this.ctx.putImageData(imData, sx, sy)
  }

  blurArea (bx, by, bWidth, bHeight, blur = 6) {
    const {
      realX,
      realY
    } = resolveAlign(bx, by, bWidth, bHeight, this)
    const c = this.createCanvas(bWidth, bHeight)
    const ctx = c.getContext('2d')

    console.log(this.ctx.canvas)

    ctx.drawImage(this.ctx.canvas, realX, realY, bWidth, bHeight, 0, 0, bWidth, bHeight)
    blurCanvas(ctx, blur)

    this.drawImage(c, bx, by, bWidth, bHeight)
  }

  createCanvas (w, h) {
    return this.backendCanvas.createCanvas(w, h)
  }

  loadImage (src) {
    return this.backendCanvas.loadImage(src)
  }

  get width () {
    return this.ctx.canvas.width
  }

  get height () {
    return this.ctx.canvas.height
  }
}
