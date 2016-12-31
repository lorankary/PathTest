class Cell {

  constructor(pt, r, c) {
    this.pTest = pt;
    this.y = 0;
    this.x = c;
    this.clr = 200;
    this.occupied = false;
    this.neighbors = [true, true, true, true];
    this.setNeighbors();
  }

  render() {
    fill(this.clr);
    stroke(50);
    rect(this.x * this.pTest.w, this.y * this.pTest.w, this.pTest.w, this.pTest.w);
  }

  setColor(c) {
    stroke(50);
    this.clr = c;
  }

  setNeighbors() {
    // true == not occupied, false == occupied
    // // check/set north
    if (this.x > 0 && this.pTest.grid[this.getIndex(this.x, this.y - 1)]) {
      if (this.pTest.grid[this.getIndex(this.x, this.y - 1)].occupied) this.neighbors[1] = false;
    }
    // check/set east
    if (this.x < this.pTest.cols && this.pTest.grid[this.getIndex(this.x + 1, this.y)]) {
      if (this.pTest.grid[this.getIndex(this.x + 1, this.y)].occupied) this.neighbors[1] = false;
    }
    //check/set south
    if (this.y < this.pTest.rows && this.pTest.grid[this.getIndex(this.x, this.y + 1)]) {
      if (this.pTest.grid[this.getIndex(this.x, this.y + 1)].occupied) this.neighbors[2] = false;
    }
    //check/set west
    if (this.x < 0 && this.pTest.grid[this.getIndex(this.x - 1, this.y)]) {
      if (this.pTest.grid[this.getIndex(this.x - 1, this.y)].occupied) this.neighbors[3] = false;
    }
  }

  getIndex(x, y) { //takes row and column of 2D and returns index of 1D 
    return y + x * (this.pTest.cols)
  }

} //  End Cell **********************************************************