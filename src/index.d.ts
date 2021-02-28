type PixelDataFunction = (fn: {
  width: Number,
  height: Number,
  rgba: [Number, Number, Number, Number]
  pos: [Number, Number]
}) => [Number, Number, Number, Number]

export default class Quadro extends CanvasRenderingContext2D {
  xAlign: 'left' | 'start' | 'center' | 'middle' | 'right' | 'end'
  yAlign: 'top' | 'start' | 'center' | 'middle' | 'bottom' | 'end'
  textAlign: 'left' | 'right' | 'center' | 'start' | 'end'
  textOverflow: 'ellipsis'
  imageFit: 'fill' | 'contain' | 'cover'

  constructor (ctx: CanvasRenderingContext2D)

  drawCircleImage(img: CanvasImageSource, x: Number, y: Number, size: Number, radius: Number)
  fillRect(x: Number, y: Number, height: Number, width: Number)
  changePixeldata(fn: PixelDataFunction, sx?: Number, sy?: Number, sw?: Number, sh?: Number)

  static loadImage(src: string): HTMLImageElement
}
