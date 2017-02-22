class Enemy {

  constructor(pt, path, radius) {
    this.pTest = pt;
    this.path = path;
    this.vel = 1.5;                                                 // velocity factor
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
    ctx.ellipse(this.loc.vx, this.loc.vy, this.radius, this.radius, 0, 2*Math.PI, false);
    ctx.fill();
  }

  update() {
    if(this.loc.dist(this.target) <= this.radius*20) {    // if we have reached the current target
        this.targetCell++;                  // set a new target
        if(this.targetCell == this.path.pathCells.length) {   // we have reached the end of the path
            console.log("kill");
            this.pTest.kill(this);
            return;
            }
        this.target = this.path.cellVector(this.path.pathCells[this.targetCell]);
        }
    // calculate new unit vector from current location to the target.  
    var targetVec = this.target.copy().sub(this.loc).normalize();    // the direction we want to go
    var targetAngle = Math.atan2(targetVec.vy, targetVec.vx);       // angle to the target
    var curVelAngle = Math.atan2(this.velVec.vy, this.velVec.vx);   // angle of current motion
    // find the difference between the angle of the current velocity
    // and the angle toward the target.
    var angleBetween = targetAngle - curVelAngle;
    if(angleBetween) {  // if there is some angle between
        // We want to rotate the current velocity direction towards the targetAngle
        // by applying an acceleration at an angle of 90 degrees 
        var accelAngle = Math.PI/2;                                   // acceleration is always 90 degrees
        if(angleBetween < 0) {
            angleBetween = -angleBetween;
            if(angleBetween > Math.PI)
                angleBetween = 2*Math.PI - angleBetween;
            else
                accelAngle = -accelAngle;
            }
        else if(angleBetween > Math.PI) {
                accelAngle = -accelAngle;
                angleBetween = 2*Math.PI - angleBetween;
            }               
        // The angle of acceleration is 90 degrees to the current velocity
        accelAngle += curVelAngle;
        // Get a unit vector for the acceleration
        var accelVec = vector2d(Math.cos(accelAngle), Math.sin(accelAngle))
        // The greater the angle between, the more we want to rotate.    
        accelVec.scale(angleBetween/3);   // scale the rotation by the angle between
        this.velVec.add(accelVec);      // apply acceleration to velocity
        }
    this.loc.add(this.velVec);          // apply velocity to location
  }

} // end class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
