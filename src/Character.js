const preloadImage = url => new Promise(resolve => {
  const image = new Image
  const onLoad = () => {
    image.removeEventListener('load', onLoad)
    resolve(image)
  }
  image.addEventListener('load', onLoad)
  image.src = url
})


class SpriteSheet {
  constructor(opts) {
    this.loaded = preloadImage(opts.image)
    this.frames = opts.frames
    this.coords = opts.coords
  }

  getCoords(type) {
    const coords = this.coords[type]
    return {
      x: coords[0] * this.frames.width,
      y: coords[1] * this.frames.height,
      width: this.frames.width,
      height: this.frames.height
    }
  }
}

export default class Character {
  constructor(opts) {
    this.spriteSheet = new SpriteSheet({
      image: opts.image,
      frames: {
        width: 48,
        height: 48
      },
      coords: {
        top: [0, 3],
        right: [0, 2],
        bottom: [0, 0],
        left: [0, 1]
      }
    })
    this.x = opts.x || 0
    this.y = opts.y || 0
    this.direction = opts.direction || 'right'
    this.alpha = 1
  }

  draw(ctx) {
    this.spriteSheet.loaded.then(image => {
      const coords = this.spriteSheet.getCoords(this.direction)
      ctx.globalAlpha = this.alpha
      ctx.drawImage(
        image,

        coords.x,
        coords.y,
        coords.width,
        coords.height,

        this.x * coords.width,
        this.y * coords.height,
        coords.width,
        coords.width
      )
      ctx.globalAlpha = 1

    })
  }
}
