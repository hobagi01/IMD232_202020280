let moverA;
let moverB;
let gravity;
let wind;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  moverA = new Mover(width / 3, height / 2, 10);
  moverB = new Mover((2 * width) / 3, height / 2, 1);
  gravity = createVector(0, 0.1); // 모순 : 무거운 물체가 늦게 떨어짐 -> 과학적으로 맞지 않음(중력은 질량에 비례해서 적용되어야 함)
  wind = createVector(0.2, 0); //바람이 중력보다 센 상황
}
function draw() {
  background(255);

  let gravityA = createVector(gravity.x, gravity.y);
  gravityA.mult(moverA.mass);
  moverA.applyForce(gravityA);
  if (mouseIsPressed && isMouseInsideCanvas()) {
    moverA.applyForce(wind);
  }
  if (moverA.contactEdge()) {
    let c = 0.1; //0~1사이의 값 / c = µ
    // let friction = createVector(moverA.vel.x, moverA.vel.y); //어차피 moverA의 vel 복사하고 싶은 것
    let friction = moverA.vel.copy();
    friction.mult(-1); //방향이 뒤집히게 됨
    friction.mult(c); // 0.5의 값을 넣어줌
    moverA.applyForce(friction);
  }
  moverA.update();
  moverA.checkEdges();
  moverA.display();
  moverA.displayVectors();

  let gravityB = createVector(gravity.x, gravity.y);
  gravityB.mult(moverB.mass);
  moverB.applyForce(gravityB);
  if (mouseIsPressed && isMouseInsideCanvas()) {
    moverB.applyForce(wind);
  }
  if (moverB.contactEdge()) {
    let c = 0.9; //0~1사이의 값 / c = µ
    let friction = moverB.vel.copy();
    friction.mult(-1); //방향이 뒤집히게 됨
    friction.mult(c); // 0.5의 값을 넣어줌
    moverB.applyForce(friction);
  }
  moverB.update();
  moverB.checkEdges();
  moverB.display();
  moverB.displayVectors();
}
