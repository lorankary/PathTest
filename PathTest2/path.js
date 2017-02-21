

class Path {
  constructor(pTest, startCell, targetCell) {
    this.pTest = pTest;
    // Random start cell from the top left quadrant of the grid
    // and random target cell from the bottom right quadrant of the grid
    this.startCell = pTest.cellByIndex(
        Math.floor(Math.random() * pTest.rows/2),
        Math.floor(Math.random() * pTest.cols/2));
     this.targetCell = pTest.cellByIndex(  
        Math.floor(Math.random() * pTest.rows/2 + pTest.rows/2),
        Math.floor(Math.random() * pTest.cols/2 + pTest.cols/2));

    this.findPath();

  }

  // return a vector to the center of a cell
  cellVector(cell) {
    return(vector2d(cell.col * this.pTest.w + this.pTest.w/2,
                cell.row * this.pTest.w + this.pTest.w/2));

  }

  // create a path from the startCell to the targetCell
  findPath() {
    for(let i = 0; i < this.pTest.grid.length; i++){
      this.pTest.grid[i].setVisited(false); // in case this is not the first path
    }
    this.pathCells = [this.startCell];
    this.currentCell = this.startCell;
    this.currentCell.setVisited(true);


    // unit vectors for all the possible directions
    var nVec = vector2d(0,-1);
    var neVec = vector2d(1,-1);
    var neUnitVec = neVec.copy().normalize();
    var eVec = vector2d(1,0);
    var seVec = vector2d(1,1);
    var seUnitVec = seVec.copy().normalize();
    var sVec = vector2d(0,1);
    var swVec = vector2d(-1,1);
    var swUnitVec = swVec.copy().normalize();
    var wVec = vector2d(-1,0);
    var nwVec = vector2d(-1,-1);
    var nwUnitVec = nwVec.copy().normalize();
    var tVec = this.cellVector(this.targetCell);  // vector to targetCell

    // loop until the currentCell is the targetCell
    while(this.currentCell != this.targetCell) {
      var candidates = [];
      var candidateVectors = [];
      // vector to the current cell
      var curVec = this.cellVector(this.currentCell);
      // unit vector from current cell to targetCell
      var curTargUnitVec = tVec.copy().sub(curVec).normalize();

      // get all possible candidates and their respective vectors
      // a candidate must not be occupied or visited
      var row = this.currentCell.row;
      var col = this.currentCell.col;
      var north = this.pTest.cellByIndex(row + nVec.vy,  col + nVec.vx);
      var northeast = this.pTest.cellByIndex(row + neVec.vy,  col + neVec.vx);
      var east = this.pTest.cellByIndex(row + eVec.vy,  col + eVec.vx);
      var southeast = this.pTest.cellByIndex(row + seVec.vy,  col + seVec.vx);
      var south = this.pTest.cellByIndex(row + sVec.vy, col + sVec.vx);
      var southwest = this.pTest.cellByIndex(row + swVec.vy, col + swVec.vx);
      var west = this.pTest.cellByIndex(row + wVec.vy, col + wVec.vx);
      var northwest = this.pTest.cellByIndex(row + nwVec.vy, col + nwVec.vx);

      if(north && !north.occupied && !north.visited){
        candidates.push(north);
        candidateVectors.push(nVec);
      }
      if(northeast && !northeast.occupied && !northeast.visited){
        // don't cross a diagonal barrier
        if(!(north && north.occupied && east && east.occupied)){
          candidates.push(northeast);
        // diagonal vectors need to be normalized
          candidateVectors.push(neUnitVec);
        }
      }
      if(east && !east.occupied && !east.visited) {
        candidates.push(east);
        candidateVectors.push(eVec);
      }
      if(southeast && !southeast.occupied && !southeast.visited){
        // don't cross a diagonal barrier
        if(!(east && east.occupied && south && south.occupied)){
          candidates.push(southeast);
          candidateVectors.push(seUnitVec);
        }
      }
      if(south && !south.occupied && !south.visited){
        candidates.push(south);
        candidateVectors.push(sVec);
      }

      if(southwest && !southwest.occupied && !southwest.visited){
        // don't cross a diagonal barrier
        if(!(south && south.occupied && west && west.occupied)){
          candidates.push(southwest);
          candidateVectors.push(swUnitVec);
        }
      }
      if(west && !west.occupied && !west.visited){
        candidates.push(west);
        candidateVectors.push(wVec);
      }
      if(northwest && !northwest.occupied && !northwest.visited){
        // don't cross a diagonal barrier
        if(!(west && west.occupied && north && north.occupied)){
          candidates.push(northwest);
          candidateVectors.push(nwUnitVec);
        }
      }
      if(candidates.length) {
        // For all the candidates, find the dot product of the unit vector
        // to the candidate and the unit vector to the targetCell
        // from the currentCell.  The result is the cosine of the angle between them
        // or the cosine of similarity. A value of 1 is the most similar
        // and -1 the least.  We want the one that is greatest (closest to 1).
        var bestCandidate = candidates[0];
        var bestDP = candidateVectors[0].dotProd(curTargUnitVec);
        for(let i = 1, l = candidates.length; i < l; i++){
          var dp = candidateVectors[i].dotProd(curTargUnitVec);
          if(dp > bestDP){
            bestDP = dp;
            bestCandidate = candidates[i];
          }
        } // for
        this.currentCell = bestCandidate;
        this.pathCells.push(bestCandidate);
        bestCandidate.visited = true;
        console.log(`new current cell = ${bestCandidate.row}, ${bestCandidate.col}`);
      } // if(candidates.length)
      else if(this.pathCells.length) {
        this.currentCell = this.pathCells.pop();
        console.log("back up");
      }
      else {
        console.log("target is unreachable");
        break;
      }
    } // while

    console.log(this.pathCells.length);
  } // findPath
} // class Path
