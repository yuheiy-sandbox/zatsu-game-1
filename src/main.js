/* global createjs */

const STAGE_COLUMN_SIZE = 48
const STAGE_COLUMN_WIDTH = 8
const STAGE_COLUMN_HEIGHT = 8

const canvas = document.createElement('canvas')
canvas.width = STAGE_COLUMN_SIZE * STAGE_COLUMN_WIDTH
canvas.height = STAGE_COLUMN_SIZE * STAGE_COLUMN_HEIGHT
document.body.appendChild(canvas)

const stage = new createjs.Stage(canvas)

class Character {
  constructor({image, x, y, direction}) {
    this._x = x || 0
    this._y = y || 0
    this._direction = direction || 'front'
    this._spriteSheet = new createjs.SpriteSheet({
      images: [image],
      frames: {
        width: STAGE_COLUMN_SIZE,
        height: STAGE_COLUMN_SIZE,
      },
      animations: {
        front: {
          frames: [0, 1, 2],
          speed: .25,
        },
        back: {
          frames: [9, 10, 11],
          speed: .25,
        },
        left: {
          frames: [3, 4, 5],
          speed: .25,
        },
        right: {
          frames: [6, 7, 8],
          speed: .25,
        },
      },
    })
    this._sprite = new createjs.Sprite(this._spriteSheet, this._direction)
  }

  getSprite() {
    return this._sprite
  }

  setDirection(direction) {
    if (this._direction !== direction) {
      this._direction = direction
      this._sprite.gotoAndPlay(direction)
    }
  }

  getPosition() {
    return {
      x: this._x,
      y: this._y
    }
  }

  setPosition({x, y}) {
    if (typeof x !== 'undefined' && this._x !== x) {
      const isOutsize = x < 0 || x > STAGE_COLUMN_WIDTH - 1
      if (isOutsize) return

      this._x = x
      this._sprite.x = STAGE_COLUMN_SIZE * x
    }
    if (typeof y !== 'undefined' && this._y !== y) {
      const isOutsize = y < 0 || y > STAGE_COLUMN_HEIGHT - 1
      if (isOutsize) return

      this._y = y
      this._sprite.y = STAGE_COLUMN_SIZE * y
    }
  }
}

class Player extends Character {
  constructor(opts) {
    super(opts)

    document.addEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = e => {
    const currentPosition = this.getPosition()

    switch (e.code) {
      case 'ArrowDown': {
        this.setDirection('front')
        this.setPosition({y: currentPosition.y + 1})
        break
      }

      case 'ArrowUp': {
        this.setDirection('back')
        this.setPosition({y: currentPosition.y - 1})
        break
      }

      case 'ArrowLeft': {
        this.setDirection('left')
        this.setPosition({x: currentPosition.x - 1})
        break
      }

      case 'ArrowRight': {
        this.setDirection('right')
        this.setPosition({x: currentPosition.x + 1})
        break
      }
    }
  }
}

class Enemy extends Character {}

const ossan = new Player({
  image: 'img/ossan.png',
  x: 0,
  y: 0,
  direction: 'right'
})
stage.addChild(ossan.getSprite())

const update = () => {
  stage.update()
}
createjs.Ticker.addEventListener('tick', update)
