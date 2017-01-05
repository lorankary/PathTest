'use strict'

// Game is the top level object and it contains the levels
class PathTest {
  constructor() { // from setup()
    //  method calls on constructed
    this.w = 50;
    this.cnv = createCanvas(900, 810);
    this.cnv.parent('canDiv');
    this.cnv.mousePressed(handleCNVMousePressed);
    background(255, 50, 0);
    this.grid = [];
    this.cols = floor(this.cnv.width / this.w);
    this.rows = floor(this.cnv.height / this.w);
    this.loadGrid();
    this.setButtonListeners();
    // // this.path = new PathX(this, 0, 3, new Cell(this, 10,10));
    // // create a wall
    // this.cellByIndex(3, 7).occupied = true;
    // this.cellByIndex(4, 7).occupied = true;
    // this.cellByIndex(5, 7).occupied = true;
    // this.cellByIndex(6, 7).occupied = true;
    // this.cellByIndex(7, 7).occupied = true;
    // this.cellByIndex(8, 7).occupied = true;
    // this.cellByIndex(9, 7).occupied = true;
    // this.cellByIndex(10, 7).occupied = true;
    // this.cellByIndex(11, 7).occupied = true;
    // this.cellByIndex(12, 7).occupied = true;
    //
    // this.cellByIndex(11, 9).occupied = true;
    // this.cellByIndex(11, 10).occupied = true;
    // this.cellByIndex(11, 11).occupied = true;
    // this.cellByIndex(11, 12).occupied = true;
    this.path = new Path(this, this.getCell(0, 3), this.getCell(10,10));
  }

  run() { // called from draw()
    clear();
    this.render();
  }

  getIndex(row, col) { //takes row and column of 2D and returns index of 1D
    return col + row * (this.cols)
  }

  getCell(row, col) {
    return(this.grid[this.getIndex(row, col)]);
  }

  setButtonListeners() {
    var b = select("#buttOne");
    b.mouseOver(handleButtonMouesOver);
    b.mouseOut(handleButtonMouesOut);
    b.mousePressed(handleButtonMouesClicked);
  }
  render() { // draw game stuff
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i].render();
    }
  }



  loadGrid() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.grid.push(new Cell(this, row, col));
      }
    }
  }

  cellByIndex(row, col){
    if(row >= 0 && row < this.rows && col >= 0 && col < this.cols)
      return(this.grid[col + row * this.cols]);
    return undefined;
  }

} // end class PathTest ********************************************************

function handleCNVMousePressed() {
  let mVec = createVector(mouseX, mouseY);
  // find the column and row mouse is on
  // lk looks to me like r and c are reversed with regard to x and y
  let r = floor(mVec.x / pTest.w);
  let c = floor(mVec.y / pTest.w);

  if (pTest.grid[r + c * pTest.cols] && !pTest.grid[r + c * pTest.cols].occupied) {
    pTest.grid[r + c * pTest.cols].clr = 50;
    pTest.grid[r + c * pTest.cols].occupied = true;
  }
}

function handleButtonMouesOver() {
  this.style('background-color', '#AA3377');
}

function handleButtonMouesOut() {
  this.style('background-color', '#AAA');
}

function handleButtonMouesClicked() {
  pTest.sendEnemies = true;
}
