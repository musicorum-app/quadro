export default class Quadro {
  xAlign: 'left' | 'start' | 'center' | 'middle' | 'right' | 'end'
  yAlign: 'top' | 'start' | 'center' | 'middle' | 'bottom' | 'end'

  constructor (ctx: CanvasRenderingContext2D)

  drawCircleImage(img: CanvasImageSource, x: Number, y: Number, size: Number, radius: Number)
  fillRect(x: Number, y: Number, height: Number, width: Number)

  static loadImageAsync(src: string): HTMLImageElement
}
