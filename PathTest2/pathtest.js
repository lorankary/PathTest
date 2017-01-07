'use strict'

// Game is the top level object and it contains the levels
class PathTest {
  constructor() { // from setup()
    //  method calls on constructed
    this.w = 50;
    this.cnv = createCanvas(900, 810);
    this.cnv.parent('canDiv');
    this.cnv.mousePressed(this.handleCNVMousePressed.bind(this));
    background(255, 50, 0);
    this.grid = [];
    this.cols = floor(this.cnv.width / this.w);
    this.rows = floor(this.cnv.height / this.w);
    this.loadGrid();
    this.path = new Path(this, this.getCell(0, 3), this.getCell(10,10));
    this.setButtonListeners();
  }

  run() { // called from draw()
    clear();
    this.render();
  }

  getIndex(row, col) { //takes row and column of 2D and returns index of 1D
    return col + row * (this.cols)
  }

  getCell(row, col) {
    if(row < 0 || col < 0)
      return undefined;
    return(this.grid[this.getIndex(row, col)]);
  }

  setButtonListeners() {
    var b = select("#buttOne"); // send enemy
    b.mouseOver(this.handleButtonMouseOver);
    b.mouseOut(this.handleButtonMouseOut);
    b.mousePressed(this.handleButtonMouseClicked);
    b = select("#buttTwo");   // find path
    b.mouseOver(this.handleButtonMouseOver);
    b.mouseOut(this.handleButtonMouseOut);
    // for the "find path button", use an anonymous callback
    // with the bind method.  Without bind(), when called
    // *this* would refer to the p5.element.  But with
    // bind(), *this* refers to the path property of the pTest instance.
    b.mousePressed(function() {
        this.findPath(); }.bind(this.path));
    }
  render() { // draw game stuff
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i].render();
    }
    // show a dot in the center of each cell on the current path
    if(this.path && this.path.pathCells && this.path.pathCells.length){
      push();
      fill(0);
      for(let i = 0; i < this.path.pathCells.length; i++){
        let cell = this.path.pathCells[i];
        ellipse(cell.col*this.w + this.w/2, cell.row*this.w + this.w/2, 3);
      }
      pop();
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

// Let the handleCNVMousePressed callback be a prototype method
// bound to the instance.
// Toggle the occupied property of the clicked cell.
  handleCNVMousePressed() {
    let row = floor(mouseY/this.w);
    let col = floor(mouseX/this.w);
    let cell = this.getCell(row, col);
    if(cell) {
      cell.setOccupied(!cell.occupied);
    }
  }


  handleButtonMouseOver() {
    this.style('background-color', '#AA3377');
  }

  handleButtonMouseOut() {
    this.style('background-color', '#AAA');
  }

  handleButtonMouseClicked() {
    pTest.sendEnemies = true;
  }
} // end class PathTest ********************************************************
