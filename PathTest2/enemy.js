class Enemy {

  constructor(pt, location, radius) {
    this.pTest = pt;
    this.vel = createVector(0, 1);
    this.acc = createVector(0, 0);
    this.loc = location;
    this.rad = radius;
  }

  run() {
    this.render();
    this.update();
  }

  render() {
    fill(250, 150, 51);
    ellipse(this.loc.x + this.pTest.w / 2, this.loc.y + this.pTest.w / 2, this.rad * 2, this.rad * 2);
  }

  update() {
    this.loc.add(this.vel);
  }

} // end class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
