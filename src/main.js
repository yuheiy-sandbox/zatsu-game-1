import Character from './Character.js'
import Renderer from './Renderer.js'

// const EventEmitter = require('events')
// const _ = require('lodash')

const renderer = new Renderer()
renderer.setColSize(16, 1)
document.body.appendChild(renderer.canvas)

const ossan = new Character({
  image: 'img/1173010501.png',
  direction: 'right',
})
const dragon = new Character({
  image: 'img/1011010501.png',
  x: 15,
  direction: 'left'
})

const renderLoop = () => {
  requestAnimationFrame(renderLoop)

  renderer.draw(ctx => {
    ossan.draw(ctx)
    dragon.draw(ctx)
  })
}
renderLoop()

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowLeft': {
      ossan.direction = 'left'
      if (ossan.x > 0) {
        ossan.x--
      }
      console.log('left')
      break
    }

    case 'ArrowRight': {
      ossan.direction = 'right'
      if (ossan.x < 16 - 1) {
        ossan.x++
      }
      console.log('right')
      break
    }

    case 'ArrowUp': {
      ossan.direction = 'top'
      console.log('top');
      break
    }

    case 'ArrowDown': {
      ossan.direction = 'bottom'
      console.log('bottom');
      break
    }

    case ' ': {
      ossan.alpha = .5
      requestAnimationFrame(() => ossan.alpha = 1)
      console.log('space');
      break
    }
  }
})
