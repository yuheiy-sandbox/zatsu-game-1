const colSize = 48

export default class Renderer {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
  }

  setColSize(width, height) {
    this.canvas.width = colSize * width
    this.canvas.height = colSize * height
  }

  draw(handler) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    handler(this.ctx)
  }
}
