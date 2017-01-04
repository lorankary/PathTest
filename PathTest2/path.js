// class PathX {
//
//   constructor(pt, col, row, targetCell) {
//     this.pTest = pt;
//     this.tCell = targetCell;
//     this.x = col; //starting x
//     this.y = row; //starting y
//     this.cells = []; // all cells in path stored in 1D array
//     //  true means unoccupied
//     this.current = this.pTest.grid[this.getIndex(this.x, this.y)];
//     //start list at start location
//     this.cells.push(this.current);
//     this.makePath();
//
//   }
//
//   makePath(){
//     if(this.current) this.loadPath();
//   }
//   loadPath() {
//     //while not reached targetCell
//     let lpLoop = 1;
//     let test1 = 0;
//     while (this.current.y < this.pTest.rows && test1++ < 200) {
//       let test2 = 0;
//       let cellFound = false
//       let r = 0
//       lpLoop++;
//         // randomly choose north east, west, south
//       while (test2++ < 99 && !cellFound) {
//         r = floor(random(4) );
//         cellFound = this.current.neighbors[r];
//       }
//       if (cellFound) {
//         //add tghis cell to the path stack
//         this.cells.push(this.current);
//         // make the new cell the current cell
//         if(r === 1) this.current = this.pTest.grid[this.getIndex(this.x+1, this.y)];
//         if(r === 2) this.current = this.pTest.grid[this.getIndex(this.x, this.y+1)];
//         if(r === 3) this.current = this.pTest.grid[this.getIndex(this.x-1, this.y)];
//         cellFound = true;
//       }else{
//         // pop a cell from the cell stack and make current
//         this.current.occupied = true;
//         this.current = this.cells.pop();
//         cellFound = true;
//       }
//
//
//     }
//     println('>>>>>>>>> ' + lpLoop)
//     this.printPath();
//
//   }
//
//   printPath() {
//      for(let i = 0; i < this.cells.length; i++){
//        println('cells.length =  ' + this.cellslength);
//        println('c, r, =  ' + this.cells[i].x + ', ' + this.cells[i].y);
//      }
//   }
//
//   getIndex(x, y) { //takes row and column of 2D and returns index of 1D
//     return y + x * (this.pTest.cols)
//   }
//
//
// }

class Path {
  constructor(pTest, startCell, targetCell) {
    this.pTest = pTest;
    this.startCell = startCell;
    this.targetCell = targetCell;

    this.findPath();

  }

  // return a vector to the center of a cell
  cellVector(cell) {
    return(createVector(cell.col * this.pTest.w + this.pTest.w/2,
                cell.row * this.pTest.w + this.pTest.w/2));

  }

  findPath() {
    for(let i = 0; i < this.pTest.grid.length; i++){
      this.pTest.grid[i].visited = false; // in case this is not the first path
    }
    this.pathCells = [this.startCell];
    this.currentCell = this.startCell;
    this.currentCell.visited = true;


    // unit vectors for all the possible directions
    var nVec = createVector(0,-1);
    var neVec = createVector(1,-1);
    var neUnitVec = neVec.copy().normalize();
    var eVec = createVector(1,0);
    var seVec = createVector(1,1);
    var seUnitVec = seVec.copy().normalize();
    var sVec = createVector(0,1);
    var swVec = createVector(-1,1);
    var swUnitVec = swVec.copy().normalize();
    var wVec = createVector(-1,0);
    var nwVec = createVector(-1,-1);
    var nwUnitVec = nwVec.copy().normalize();

    var tVec = this.cellVector(this.targetCell);  // vector to targetCell
    while(this.currentCell != this.targetCell) {
      var candidates = [];
      var candidateVectors = [];
      // vector to the current cell
      var curVec = this.cellVector(this.currentCell);
      // unit vector from current cell to targetCell
      var curTargUnitVec = tVec.copy().sub(curVec).normalize();
      // console.log(curTargUnitVec);

      // get all possible candidates and their respective vectors
      var row = this.currentCell.row;
      var col = this.currentCell.col;
      var north = this.pTest.getCell(row + nVec.y,  col + nVec.x);
      if(north && !north.occupied && !north.visited){
        candidates.push(north);
        candidateVectors.push(nVec);
      }
      var northeast = this.pTest.getCell(row + neVec.y,  col + neVec.x);
      if(northeast && !northeast.occupied && !northeast.visited){
        candidates.push(northeast);
        // diagonal vectors need to be normalized
        candidateVectors.push(neUnitVec);
      }
      var east = this.pTest.getCell(row + eVec.y,  col + eVec.x);
      if(east && !east.occupied && !east.visited) {
        candidates.push(east);
        candidateVectors.push(eVec);
      }
      // console.log(`seVec ${seVec}`);
      var southeast = this.pTest.getCell(row + seVec.y,  col + seVec.x);
      // if(southeast){
      //   console.log(`southeast row col visited occupied ${southeast.row} ${southeast.col} ${southeast.visited} ${southeast.occupied}`)
      // }
      if(southeast && !southeast.occupied && !southeast.visited){
        // console.log(`southeast ${southeast}`);
        candidates.push(southeast);
        candidateVectors.push(seUnitVec);
      }
      var south = this.pTest.getCell(row + sVec.y, col + sVec.x);
      if(south && !south.occupied && !south.visited){
        candidates.push(south);
        candidateVectors.push(sVec);
      }
      // console.log(`swVec ${swVec}`);
      var southwest = this.pTest.getCell(row + swVec.y, col + swVec.x);
      // if(southwest){
      //   console.log(`southeast row col visited occupied ${southwest.row} ${southwest.col} ${southwest.visited} ${southwest.occupied}`)
      // }

      if(southwest && !southwest.occupied && !southwest.visited){
        // console.log(`southwest ${southwest}`);
        candidates.push(southwest);
        candidateVectors.push(swUnitVec);
      }
      var west = this.pTest.getCell(row + wVec.y, col + wVec.x);
      if(west && !west.occupied && !west.visited){
        candidates.push(west);
        candidateVectors.push(wVec);
      }
      var northwest = this.pTest.getCell(row + nwVec.y, col + nwVec.x);
      if(northwest && !northwest.occupied && !northwest.visited){
        candidates.push(northwest);
        candidateVectors.push(nwUnitVec);
      }
      if(candidates.length) {
        // For all the candidates, find the dot product of the unit vector
        // for the candidate and the unit vector for the direction to
        // the target.  The result is the cosine of the angle between
        // or cosine of similarity. A value of 1 is the most similarity
        // and -1 the least.  We want the one that is greatest (closes to 1).

        // console.log(candidates);
        // console.log(candidateVectors);

        var bestCandidate = candidates[0];
        var bestDP = candidateVectors[0].dot(curTargUnitVec);
        // console.log(bestDP);
        for(let i = 1, l = candidates.length; i < l; i++){
          var dp = candidateVectors[i].dot(curTargUnitVec);
          // console.log(dp);
          if(dp > bestDP){
            bestDP = dp;
            bestCandidate = candidates[i];
          }
        } // for
        this.currentCell = bestCandidate;
        this.pathCells.push(bestCandidate);
        this.currentCell.visited = true;
        console.log(`new current cell = ${bestCandidate.row}, ${bestCandidate.col}`);
      } // if(candidates.length)
      // if(this.pathCells.length >= 3)
      //   break;
    } // while

    console.log(this.pathCells.length)

  } // findPath
} // class Path
