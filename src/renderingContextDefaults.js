export default class RenderingContextDefaults {
  constructor (ctx) {
    this.ctx = ctx

    // Methods
    this.arc = this.ctx.arc
    this.arcTo = this.ctx.arcTo
    this.beginPath = this.ctx.beginPath
    this.bezierCurveTo = this.ctx.bezierCurveTo
    this.clearRect = this.ctx.clearRect
    this.clip = this.ctx.clip
    this.closePath = this.ctx.closePath
    this.createImageData = this.ctx.createImageData
    this.createLinearGradient = this.ctx.createLinearGradient
    this.createPattern = this.ctx.createPattern
    this.createRadialGradient = this.ctx.createRadialGradient
    this.drawFocusIfNeeded = this.ctx.drawFocusIfNeeded
    // this.drawImage = this.ctx.drawImage
    this.ellipse = this.ctx.ellipse
    this.fill = this.ctx.fill
    // this.fillRect = this.ctx.fillRect
    this.fillText = this.ctx.fillText
    this.getContextAttributes = this.ctx.getContextAttributes
    this.getImageData = this.ctx.getImageData
    this.getLineDash = this.ctx.getLineDash
    this.getTransform = this.ctx.getTransform
    this.isPointInPath = this.ctx.isPointInPath
    this.isPointInStroke = this.ctx.isPointInStroke
    this.lineTo = this.ctx.lineTo
    this.measureText = this.ctx.measureText
    this.moveTo = this.ctx.moveTo
    this.putImageData = this.ctx.putImageData
    this.quadraticCurveTo = this.ctx.quadraticCurveTo
    this.rect = this.ctx.rect
    this.restore = this.ctx.restore
    this.rotate = this.ctx.rotate
    this.save = this.ctx.save
    this.scale = this.ctx.scale
    this.setLineDash = this.ctx.setLineDash
    this.setTransform = this.ctx.setTransform
    this.stroke = this.ctx.stroke
    this.strokeRect = this.ctx.strokeRect
    this.strokeText = this.ctx.strokeText
    this.transform = this.ctx.transform
    this.translate = this.ctx.translate
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

  set filter (filter) {
    this.ctx.filter = filter
  }

  get filter () {
    return this.ctx.filter
  }

  set globalAlpha (globalAlpha) {
    this.ctx.globalAlpha = globalAlpha
  }

  get globalAlpha () {
    return this.ctx.globalAlpha
  }

  set globalCompositeOperation (globalCompositeOperation) {
    this.ctx.globalCompositeOperation = globalCompositeOperation
  }

  get globalCompositeOperation () {
    return this.ctx.globalCompositeOperation
  }

  set imageSmoothingEnabled (imageSmoothingEnabled) {
    this.ctx.imageSmoothingEnabled = imageSmoothingEnabled
  }

  get imageSmoothingEnabled () {
    return this.ctx.imageSmoothingEnabled
  }

  set lineCap (lineCap) {
    this.ctx.lineCap = lineCap
  }

  get lineCap () {
    return this.ctx.lineCap
  }

  set lineDashOffset (lineDashOffset) {
    this.ctx.lineDashOffset = lineDashOffset
  }

  get lineDashOffset () {
    return this.ctx.lineDashOffset
  }

  set lineJoin (lineJoin) {
    this.ctx.lineJoin = lineJoin
  }

  get lineJoin () {
    return this.ctx.lineJoin
  }

  set lineWidth (lineWidth) {
    this.ctx.lineWidth = lineWidth
  }

  get lineWidth () {
    return this.ctx.lineWidth
  }

  set miterLimit (miterLimit) {
    this.ctx.miterLimit = miterLimit
  }

  get miterLimit () {
    return this.ctx.miterLimit
  }

  set shadowBlur (shadowBlur) {
    this.ctx.shadowBlur = shadowBlur
  }

  get shadowBlur () {
    return this.ctx.shadowBlur
  }

  set shadowColor (shadowColor) {
    this.ctx.shadowColor = shadowColor
  }

  get shadowColor () {
    return this.ctx.shadowColor
  }

  set shadowOffsetX (shadowOffsetX) {
    this.ctx.shadowOffsetX = shadowOffsetX
  }

  get shadowOffsetX () {
    return this.ctx.shadowOffsetX
  }

  set shadowOffsetY (shadowOffsetY) {
    this.ctx.shadowOffsetY = shadowOffsetY
  }

  get shadowOffsetY () {
    return this.ctx.shadowOffsetY
  }

  set strokeStyle (strokeStyle) {
    this.ctx.strokeStyle = strokeStyle
  }

  get strokeStyle () {
    return this.ctx.strokeStyle
  }

  set textBaseline (textBaseline) {
    this.ctx.textBaseline = textBaseline
  }

  get textBaseline () {
    return this.ctx.textBaseline
  }
}
