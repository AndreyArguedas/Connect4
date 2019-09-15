class Platform {
  constructor(rows = 0, cols = 0, x = 0, y = 0, dimension = 25, color = { r: 255, g: 255, b: 255 },margin = 2) {
    this.platform = this.generatePlatform(rows, cols)
    this.dimension = dimension
    this.color = color
    this.x = x
    this.y = y
    this.margin = margin
  }

  show() {
    this.platform.forEach((row, i) =>
      row.forEach((piece, j) =>
        piece === null ? this.showEmptySpace(i, j) : piece.show()
      )
    )
  }

  generatePlatform(rows, cols) {
    return Array.from(new Array(rows), row =>
      Array.from(new Array(cols), col => null)
    )
  }

  showEmptySpace(row, col) {
    let { r, g, b } = this.color
    fill(255) //Change
    stroke(r, g, b)
    circle(
      row * this.dimension * this.margin + this.dimension,
      col * this.dimension * this.margin + this.dimension,
      this.dimension
    )
  }
}
