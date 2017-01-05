class Cell {

  constructor(pt, r, c) {
    this.pTest = pt;
    this.row = r;
    this.col = c;
    this.clr = 200;
    this.occupied = false;
    this.visited = false;
  }

  render() {
    fill(this.clr);
    stroke(50);
    rect(this.col * this.pTest.w, this.row * this.pTest.w, this.pTest.w, this.pTest.w);
  }

  setColor(c) {
    stroke(50);
    this.clr = c;
  }



} //  End Cell **********************************************************
