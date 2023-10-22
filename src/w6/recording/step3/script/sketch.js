let emitter;
let gravity;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);
  rectMode(CENTER);
  colorMode(HSB, 360, 100, 100, 100);
  emitter = new Emitter(width / 2, 0); // 시작하는 위치를 변경
  gravity = createVector(0, 0.1); // 중력을 느리게 설정
  background(360, 0, 100);
}

function draw() {
  background(360, 0, 100);
  emitter.update();
  emitter.display();
  console.log('파티클 갯수:', emitter.particles.length);
}
