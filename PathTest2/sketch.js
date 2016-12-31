var pTest;   // the maze object and the only global variable exposed

function setup() {
  pTest = new PathTest();
}

function draw() {
    pTest.run();
}
