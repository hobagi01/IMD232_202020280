let mover;
let wind;
let gravity;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  mover = new MoverNoMass(width / 2, height / 2, 50);
  gravity = createVector(0, 0.1);
  wind = createVector(0.2, 0); //바람이 중력보다 센 상황
}
function draw() {
  background(255);

  mover.addAcc(gravity);
  if (mouseIsPressed && isMouseInsideCanvas()) {
    // 캔버스 내부에서만 클릭했을 때 작동하도록 함(p5Util.js에 적혀있음)
    //항상 적용되는 것이 아니라, 마우스를 눌렀을 때라는 조건을 넣음
    mover.addAcc(wind);
  }
  // mover.addAcc(wind); // wind가 없을 경우 아래로 향하는 힘만 작용, wind도 있으면 두 가속도의 합성으로 이루어짐
  mover.update();
  mover.checkEdges();
  mover.display();
  mover.displayVectors();
}
