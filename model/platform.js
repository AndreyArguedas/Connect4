class Platform {
  constructor(rows = 0, cols = 0, x = 0, y = 0, dimension = 25, color = { r: 255, g: 255, b: 255 },margin = 2) {
    this.platform = this.generatePlatform(rows, cols)
    this.dimension = dimension
    this.color = color
    this.x = x
    this.y = y
    this.margin = margin
  }

  generatePlatform(rows, cols) {
    return Array.from(new Array(rows), row =>
      Array.from(new Array(cols), col => null)
    )
  }

  existsNeighborAtBottom(row, col) {
    if(row < 0 || col < 0)
      return false;
    if (row >= this.platform.length || col >= this.platform.length) {
      return false;
    }
    else {
      return !(this.platform[row][col + 1] === null);
    }
  }

  isSpaceEmpty(row, col) {
    return this.platform[row][col] === null;
  }

}

module.exports = Platform
