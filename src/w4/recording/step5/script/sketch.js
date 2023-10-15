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
  moverA.applyforce(gravityA);
  if (mouseIsPressed && isMouseInsideCanvas()) {
    moverA.applyforce(wind);
  }
  moverA.update();
  moverA.checkEdges();
  moverA.display();
  moverA.displayVectors();

  let gravityB = createVector(gravity.x, gravity.y);
  gravityB.mult(moverB.mass);
  moverB.applyforce(gravityB);
  if (mouseIsPressed && isMouseInsideCanvas()) {
    moverB.applyforce(wind);
  }
  moverB.update();
  moverB.checkEdges();
  moverB.display();
  moverB.displayVectors();
}
