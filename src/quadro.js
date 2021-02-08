export class Quadro {
  constructor (context) {
    this.ctx = context
    this.xAlign = 'left'
    this.yAlign = 'top'
    this.textOverflow = 'ellipsis'
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

        console.log(text, width)
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

  drawImage (img, x, y, width, height) {
    const {
      realX,
      realY
    } = this.resolveAlign(x, y, width, height)

    this.ctx.drawImage(img, realX, realY, width, height)
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

  createCanvas (w, h) {
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    return c
  }

  static async loadImageAsync (src) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      const img = new Image()
      img.src = src
      img.onload = () => {
        resolve(img)
      }
      img.onerror = err => {
        reject(err)
      }
    })
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
