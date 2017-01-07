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
    push();
    if(this.occupied)
      fill(50);
    else
      fill(200);
    stroke(50);
    rect(this.col * this.pTest.w, this.row * this.pTest.w, this.pTest.w, this.pTest.w);
    pop();
  }

  setColor(c) { this.clr = c; }

  setOccupied(occupied){ this.occupied = occupied; }

  setVisited(visited) { this.visited = visited; }


} //  End Cell **********************************************************
