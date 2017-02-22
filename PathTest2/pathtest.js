'use strict'

window.addEventListener('load', setup, false);

var pathtest;   // the global game object
const FRAME_RATE=30;

function setup() {
  pathtest = new PathTest();
  window.setTimeout(draw, 100);    // wait 100ms for resources to load then start draw loop
}

function draw() {   // the animation loop
    pathtest.run();
    window.setTimeout(draw, 1000/FRAME_RATE);  // come back here every interval
}


// Game is the top level object and it contains the levels
class PathTest {
  constructor() { // from setup()
    //  method calls on constructed
    this.w = 50;
    this.canvas =  document.getElementById('canvas');
  	if (!this.canvas || !this.canvas.getContext) 
        throw "No valid canvas found!";
    this.context = this.canvas.getContext("2d");
    if(!this.context)
        throw "No valid context found!"; 
    
    this.canvas.addEventListener('click', this.handleCNVMousecClick.bind(this));  
    this.grid = [];
    this.cols = Math.floor(this.canvas.width / this.w);
    this.rows = Math.floor(this.canvas.height / this.w);
    this.loadGrid();
    this.path = new Path(this);
    this.setButtonListeners();
    this.enemies = [];
  }

  run() { // called from draw()
    this.render();
  }
  
  kill(enemy) {
    for(let i = 0; i < this.enemies.length; i++)
        if(this.enemies[i] === enemy) {
            this.enemies.splice(i, 1);  // kill enemy by removing from list
            }
    }

  setButtonListeners() {
    var b = document.getElementById('buttOne'); // send enemy
    if(b) {
        b.addEventListener('mouseover',this.handleButtonMouseOver);
        b.addEventListener('mouseout',this.handleButtonMouseOut);
        b.addEventListener('click', this.handleButtonMouseClicked);
        }
   }
   
  render() { // draw game stuff
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i].render();
    }
    // show a dot in the center of each cell on the current path
    if(this.path && this.path.pathCells && this.path.pathCells.length){
      this.context.save();
      this.context.fillStyle = 'black';
      for(let i = 0; i < this.path.pathCells.length; i++){
        let cell = this.path.pathCells[i];
        this.context.beginPath();
        this.context.ellipse(cell.col*this.w + this.w/2, cell.row*this.w + this.w/2, 3,3,0,2*Math.PI, false);
        this.context.fill();
      }
      this.context.restore();
    }
    for(let i = 0; i < this.enemies.length; i++){
        this.enemies[i].run();
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
  handleCNVMousecClick(evt) {
    let row = Math.floor(evt.offsetY/this.w);
    let col = Math.floor(evt.offsetX/this.w);
    let cell = this.cellByIndex(row, col);
    if(cell) {
      cell.setOccupied(!cell.occupied);
    }
    this.enemies = [];      // delete all existing enemies
    this.path.findPath();   // recalculate the path
    this.enemies.push(new Enemy(this, this.path, 3.0));
  }


  handleButtonMouseOver() {
    this.style.backgroundColor = '#AA3377';
  }

  handleButtonMouseOut() {
    this.style.backgroundColor = '#AAA';
  }

  handleButtonMouseClicked() {
    pathtest.enemies.push(new Enemy(pathtest, pathtest.path, 3.0));
  }
} // end class PathTest ********************************************************
