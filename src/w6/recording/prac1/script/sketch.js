let emitter;
let particles = [];
const maxParticles = 100;
let gravity;

function setup() {
  setCanvasContainer('canvas', 2, 1, true); // 캔버스 설정
  colorMode(HSL, 360, 100, 100, 100);
  background('white');
  emitter = new Emitter(width / 2, height / 2);
  gravity = createVector(0, 0.1);
}

function draw() {
  background('white');
  console.log('현재 파티클 개수: ' + particles.length);
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.applyForce(gravity);
    p.update();
    p.display();
    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
  emitter.emit(mouseX, mouseY, 100);
}
