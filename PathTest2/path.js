class PathX {

  constructor(pt, col, row, targetCell) {
    this.pTest = pt;
    this.tCell = targetCell;
    this.x = col; //starting x
    this.y = row; //starting y
    this.cells = []; // all cells in path stored in 1D array
    //  true means unoccupied
    this.current = this.pTest.grid[this.getIndex(this.x, this.y)];
    //start list at start location
    this.cells.push(this.current);
    this.makePath();

  }

  makePath(){
    if(this.current) this.loadPath();
  }
  loadPath() {
    //while not reached targetCell
    let lpLoop = 1;
    let test1 = 0;
    while (this.current.y < this.pTest.rows && test1++ < 200) {
      let test2 = 0;
      let cellFound = false
      let r = 0
      lpLoop++;
        // randomly choose north east, west, south
      while (test2++ < 99 && !cellFound) {
        r = floor(random(4) );
        cellFound = this.current.neighbors[r];
      }
      if (cellFound) {
        //add tghis cell to the path stack
        this.cells.push(this.current);
        // make the new cell the current cell
        if(r === 1) this.current = this.pTest.grid[this.getIndex(this.x+1, this.y)];
        if(r === 2) this.current = this.pTest.grid[this.getIndex(this.x, this.y+1)];
        if(r === 3) this.current = this.pTest.grid[this.getIndex(this.x-1, this.y)];
        cellFound = true;
      }else{
        // pop a cell from the cell stack and make current
        this.current.occupied = true;
        this.current = this.cells.pop();
        cellFound = true;
      }


    }
    println('>>>>>>>>> ' + lpLoop)
    this.printPath();

  }

  printPath() {
     for(let i = 0; i < this.cells.length; i++){
       println('cells.length =  ' + this.cellslength);
       println('c, r, =  ' + this.cells[i].x + ', ' + this.cells[i].y);
     }
  }

  getIndex(x, y) { //takes row and column of 2D and returns index of 1D 
    return y + x * (this.pTest.cols)
  }


}