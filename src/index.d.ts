import { Canvas, Image } from 'canvas'

type PixelDataFunction = (fn: {
  width: number,
  height: number,
  rgba: [number, number, number, number]
  pos: [number, number]
}) => [number, number, number, number]

export class Quadro extends CanvasRenderingContext2D {
  xAlign: 'left' | 'start' | 'center' | 'middle' | 'right' | 'end'
  yAlign: 'top' | 'start' | 'center' | 'middle' | 'bottom' | 'end'
  textAlign: 'left' | 'right' | 'center' | 'start' | 'end'
  textOverflow: 'ellipsis'
  imageFit: 'fill' | 'contain' | 'cover'

  width: number
  height: number

  constructor (ctx: CanvasRenderingContext2D, nodeCanvas?: Canvas)

  drawCircleImage(img: CanvasImageSource, x: number, y: number, size: number, radius: number)
  changePixeldata(fn: PixelDataFunction, sx?: number, sy?: number, sw?: number, sh?: number)
  blurArea (bx: number, by: number, bWidth: number, bHeight: number, blur: number)
  writeTextLine (text: string, x: number, y: number, maxWidth: number)
  drawImage (img: CanvasImageSource, x: number, y: number, width?: number, height?: number): void
  drawCircleImage (img: CanvasImageSource, x: number, y: number, size?: number, radius?: number)
  createCanvas (width: number, height: number): Canvas
  loadImage (src: string): Promise<Image>

  static loadImage(src: string): HTMLImageElement
}
