export function isWeb () {
  // eslint-disable-next-line no-undef
  return !!window
}

export function resolveAlign (x, y, width, height, inst) {
  let realX = x
  let realY = y
  if (inst.xAlign === 'left' || inst.xAlign === 'start') {
    realX = x
  } else if (inst.xAlign === 'center' || inst.xAlign === 'middle') {
    realX = x - (width * 0.5)
  } else if (inst.xAlign === 'right' || inst.xAlign === 'edn') {
    realX = x - width
  }

  if (inst.yAlign === 'top' || inst.yAlign === 'start') {
    realY = y
  } else if (inst.yAlign === 'center' || inst.yAlign === 'middle') {
    realY = y - (height * 0.5)
  } else if (inst.yAlign === 'bottom' || inst.yAlign === 'end') {
    realY = y - height
  }

  return {
    realX,
    realY
  }
}

export function blurCanvas (ctx, blur) {
  const delta = 5
  const alphaLeft = 1 / (2 * Math.PI * delta * delta)
  const step = blur < 3 ? 1 : 2
  let sum = 0
  for (let y = -blur; y <= blur; y += step) {
    for (let x = -blur; x <= blur; x += step) {
      sum += alphaLeft * Math.exp(-(x * x + y * y) / (2 * delta * delta))
    }
  }
  for (let y = -blur; y <= blur; y += step) {
    for (let x = -blur; x <= blur; x += step) {
      ctx.globalAlpha = alphaLeft * Math.exp(-(x * x + y * y) / (2 * delta * delta)) / sum * blur
      ctx.drawImage(ctx.canvas, x, y)
    }
  }
  ctx.globalAlpha = 1
}
