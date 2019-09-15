class Piece {
  constructor(x = 0, y = 0, diameter = 5, color = { r: 0, g: 0, b: 0 }) {
    this.color = color
    this.x = x
    this.y = y
    this.diameter = diameter
  }

  show() {
    let actualColor = this.color
    fill(actualColor.r, actualColor.g, actualColor.b)
    circle(this.x, this.y, this.diameter)
  }
}
