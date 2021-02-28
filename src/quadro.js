import canvas from 'canvas'

export class Quadro {
  constructor (context) {
    this.ctx = context
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
    } = this.resolveAlign(x, y, width, height)

    this.ctx.fillRect(realX, realY, width, height)
  }

  // Credits of cover to https://observablehq.com/@severo/image-cover
  drawImage (img, x, y, w, h) {
    const {
      realX,
      realY
    } = this.resolveAlign(x, y, w, h)

    if (this.imageFit === 'fill') {
      return this.ctx.drawImage(img, realX, realY, w, h)
    }

    let {
      width,
      height
    } = img
    let sx = 0
    let sy = 0
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
    } = this.resolveAlign(x, y, size, size)

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

  createCanvas (w, h) {
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    return c
  }

  static async loadImage (src) {
    return canvas.loadImage(src)
  }

  set fillStyle (style) {
    this.ctx.fillStyle = style
  }

  get fillStyle () {
    return this.ctx.fillStyle
  }

  set font (font) {
    this.ctx.font = font
  }

  get font () {
    return this.ctx.font
  }

  set textAlign (textAlign) {
    this.ctx.textAlign = textAlign
  }

  get textAlign () {
    return this.ctx.textAlign
  }

  get width () {
    return this.ctx.canvas.width
  }

  get height () {
    return this.ctx.canvas.height
  }

  resolveAlign (x, y, width, height) {
    let realX = x
    let realY = y
    if (this.xAlign === 'left' || this.xAlign === 'start') {
      realX = x
    } else if (this.xAlign === 'center' || this.xAlign === 'middle') {
      realX = x - (width * 0.5)
    } else if (this.xAlign === 'right' || this.xAlign === 'edn') {
      realX = x - width
    }

    if (this.yAlign === 'top' || this.yAlign === 'start') {
      realY = y
    } else if (this.yAlign === 'center' || this.yAlign === 'middle') {
      realY = y - (height * 0.5)
    } else if (this.yAlign === 'bottom' || this.yAlign === 'end') {
      realY = y - height
    }

    return {
      realX,
      realY
    }
  }
}
