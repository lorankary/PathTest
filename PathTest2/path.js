

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
      this.pTest.grid[i].setPathIndex(0);

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
      
      var north = this.pTest.cellByIndex(row + nVec.y,  col + nVec.x);
      var northeast = this.pTest.cellByIndex(row + neVec.y,  col + neVec.x);
      var east = this.pTest.cellByIndex(row + eVec.y,  col + eVec.x);
      var southeast = this.pTest.cellByIndex(row + seVec.y,  col + seVec.x);
      var south = this.pTest.cellByIndex(row + sVec.y, col + sVec.x);
      var southwest = this.pTest.cellByIndex(row + swVec.y, col + swVec.x);
      var west = this.pTest.cellByIndex(row + wVec.y, col + wVec.x);
      var northwest = this.pTest.cellByIndex(row + nwVec.y, col + nwVec.x);
      
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
      else if(this.pathCells.length > 1) {
        this.pathCells.pop();   // discard the one at the end of the path
        this.currentCell = this.pathCells[this.pathCells.length-1]; // go back to the one before it
        console.log("back up");
      }
      else {
        console.log("target is unreachable");
        break;
      }
    } // while
    
    // now optimize the path by looking for shortcuts and eliminating cells on the Path
    // that can be short-cutted.  Start at the end and work backwards looking for neighbor cells
    // that are earlier in the path.
    // First, give every cell in the path a Number
    var i;
    for( i = 0; i < this.pathCells.length; i++)
        this.pathCells[i].pathIndex = i;
    var i = this.pathCells.length -1;
    var currentCell = this.pathCells[i];    // last in the Path
    var previousCell = this.pathCells[i-1]; 
    var lastCell = new Cell(this.pTest, -1, -1);
    while(previousCell != this.pathCells[0]) {   // previousCell != startCell
        // look at all neighbors
        candidates = [];
        north = this.pTest.cellByIndex(currentCell.row-1,  currentCell.col);
        northeast = this.pTest.cellByIndex(currentCell.row-1,  currentCell.col + 1);
        east = this.pTest.cellByIndex(currentCell.row ,  currentCell.col + 1);
        southeast = this.pTest.cellByIndex(currentCell.row + 1,  currentCell.col + 1);
        south = this.pTest.cellByIndex(currentCell.row + 1, currentCell.col);
        southwest = this.pTest.cellByIndex(currentCell.row + 1, currentCell.col + -1);
        west = this.pTest.cellByIndex(currentCell.row, currentCell.col -1);
        northwest = this.pTest.cellByIndex(currentCell.row + -1, currentCell.col -1);
        
        // only consider neighbors who are in the path and are not blocked diagonally
        // and are not either the next in the path or previous in the path.
        if(north && north.pathIndex && north != previousCell && north != lastCell)
            candidates.push(north);
        if(northeast && northeast.pathIndex && northeast != previousCell && northeast != lastCell) {
            if(!(north && north.occupied && east && east.occupied))
                candidates.push(northeast);
            }
        if(east && east.pathIndex && east != previousCell && east != lastCell)
            candidates.push(east);
        if(southeast && southeast.pathIndex && southeast != previousCell && southeast != lastCell) {
            if(!(east && east.occupied && south && south.occupied))
                candidates.push(southeast);
        }
        if(south && south.pathIndex && south != previousCell && south != lastCell)
            candidates.push(south);
        if(southwest && southwest.pathIndex && southwest != previousCell && southwest != lastCell) {
            if(!(south && south.occupied && west && west.occupied))
                candidates.push(southwest);
            }
        if(west && west.pathIndex && west != previousCell && west != lastCell)
            candidates.push(west);
        if(northwest && northwest.pathIndex && northwest != previousCell && northwest != lastCell) {
            if(!(west && west.occupied && north && north.occupied))
                candidates.push(northwest);
        }
        if(candidates.length) {
            // if there are any candidates, there must be a short cut
            let bestCandidate = candidates[0].pathIndex;
            for(let j = 1; j < candidates.length; j++)
                if(candidates[j].pathIndex < bestCandidate) {
                    bestCandidate = candidates[j].pathIndex;
                }
            // now we can eliminate all cells inbetween
            var eliminated = this.pathCells.splice(bestCandidate+1, currentCell.pathIndex -1 - bestCandidate);
            console.log("eliminated", eliminated);
            for(let j = 0; j < eliminated.length; j++)
                eliminated[j].pathIndex = 0;
             i = bestCandidate;
            }
        else     // no shortcut candidates
            i--;
        lastCell = currentCell;
        currentCell = this.pathCells[i];
        previousCell = this.pathCells[i-1];
    }
    

    console.log(this.pathCells.length);
  } // findPath
} // class Path
