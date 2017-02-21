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
    var ctx = this.pTest.context;
     if(this.occupied)
      ctx.fillStyle = 'darkgray';
    else
      ctx.fillStyle = 'lightgray';
    ctx.fillRect(this.col * this.pTest.w, this.row * this.pTest.w, this.pTest.w, this.pTest.w);
    ctx.strokeStyle = 'black';    
    ctx.strokeRect(this.col * this.pTest.w, this.row * this.pTest.w, this.pTest.w, this.pTest.w);
  }

  setColor(c) { this.clr = c; }

  setOccupied(occupied){ this.occupied = occupied; }

  setVisited(visited) { this.visited = visited; }


} //  End Cell **********************************************************
