let emitter;
let particle;
let g;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);
  colorMode(HSL, 360, 100, 100);
  particle = new Ball(width / 2, 0, 0, 0, 1, 0, 100, 50);

  emitter = new Emitter(width / 2, height); // 아래에서 위로 올라가도록 설정 / 0 -> height

  g = createVector(0, 0.1);
  background(255);
}
function draw() {
  background('white');
  const scaledG = p5.Vector.mult(g, particle.mass);
  particle.applyForce(scaledG);
  particle.update();
  particle.display();

  emitter.createBall();
  emitter.applyGravity(g);
  emitter.update();
  emitter.display();
  console.log(emitter.balls.length);
}

//펑펑! : 화면 중앙에서 시작, 초기 힘 : 360도로 돌게 하고? / 그 후에 중력값으로 떨어지게 함
