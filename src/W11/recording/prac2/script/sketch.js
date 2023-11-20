let aDrunkenObj;
let trace = [];
let path = [];

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  aDrunkenObj = new Drunken(width / 2, height / 2);
  background('white');
}

function draw() {
  //   ellipse(mouseX, mouseY, 50);
  //계산
  const randomForce = p5.Vector.random2D();
  randomForce.mult(1);
  aDrunkenObj.applyForce(randomForce);
  aDrunkenObj.update();
  aDrunkenObj.infiniteEdge();

  if (aDrunkenObj.isCrossed) {
    path = [];
    trace.push(path);
    path.push([aDrunkenObj.pos.x, aDrunkenObj.pos.y]);
  } else {
    path.push([aDrunkenObj.pos.x, aDrunkenObj.pos.y]);
  }

  //표현
  if (aDrunkenObj.isCrossed) {
    background('red');
  } else {
    background('white');
  }
  //   background('white');
  for (let pathIdx = 0; pathIdx < trace.length; pathIdx++) {
    const aPath = trace[pathIdx];
    noFill();
    beginShape();
    for (let pointIdx = 0; pointIdx < aPath.length; pointIdx++) {
      const point = aPath[pointIdx];
      vertex(point[0], point[1]);
    }
    endShape();
  }
  aDrunkenObj.display();

  console.log(trace);
}
