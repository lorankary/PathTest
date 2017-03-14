class Enemy {

  constructor(pt, path, radius) {
    this.pTest = pt;
    this.path = path;
    this.vel = 3.0;                                                 // velocity factor
    this.acc = 1.0;                                                 // accel factor
    this.loc = this.path.cellVector(this.path.pathCells[0]);
    this.targetCell = 1;    // index into pathCells
    this.target = this.path.cellVector(this.path.pathCells[this.targetCell]);
    var targetVec = this.target.copy().sub(this.loc);
    this.velVec = targetVec.copy().normalize().scale(this.vel);      // initial velocity vector
    
    this.radius = radius;
  }

  run() {
    this.update();
    this.render();
  }

  render() {
    var ctx = this.pTest.context;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.ellipse(this.loc.x, this.loc.y, this.radius, this.radius, 0, 2*Math.PI, false);
    ctx.fill();
  }

  update() {

    if(this.loc.dist(this.target) <= this.radius*4) {    // if we have reached the current target
        this.targetCell++;                  // set a new target
        if(this.targetCell == this.path.pathCells.length) {   // we have reached the end of the path
            this.pTest.kill(this);
            return;
            }
        this.target = this.path.cellVector(this.path.pathCells[this.targetCell]);
        }
    // calculate new unit vector from current location to the target.  
    var targetVec = this.target.copy().sub(this.loc).normalize();    // the direction we want to go
    var angleBetween = this.velVec.angleBetween(targetVec);
    if(angleBetween) {  // if there is some angle between
        if(angleBetween > 0 && angleBetween > Math.PI)  // positive and > 180 degrees
            angleBetween = angleBetween - 2*Math.PI;   // make negative and < 180 degrees
        else if(angleBetween < 0 && angleBetween < -Math.PI)   // negative and < -180 degrees
            angleBetween = angleBetween = angleBetween + 2*Math.PI;  // make positive and < 180 degrees
            
        // now rotate the current velocity in the direction of the targetAngle
        this.velVec.rotate(angleBetween/10)
        } 
    this.loc.add(this.velVec);          // apply velocity to location
  }

} // end class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
