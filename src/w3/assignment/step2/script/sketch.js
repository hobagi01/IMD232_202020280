let pos;
let vel;
let acc;
let cv;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  background(255);
  pos = createVector(random(width), random(height)); // 무작위 초기 위치 설정
  vel = createVector(0, 0);
  acc = createVector(0, 0); // 초기 가속도는 0으로 설정
  cv = createVector(width / 2, height / 2);
}

function draw() {
  background(255);
  strokeWeight(2);

  // 중심점에서 마우스 위치로 향하는 벡터를 계산
  let target = createVector(mouseX, mouseY);
  let accelerationDirection = p5.Vector.sub(target, cv);
  accelerationDirection.normalize(); // 벡터를 정규화하여 크기를 1로 만듦
  acc = accelerationDirection.mult(0.1); // 크기를 0.1로 조절하여 가속도로 사용

  // 속도 업데이트
  vel.add(acc).limit(2);

  // 위치 업데이트
  pos.add(vel);

  // ellipse
  fill(0);
  noStroke();
  ellipse(pos.x, pos.y, 80);

  // line
  strokeWeight(2);
  stroke(0);

  // 중심점에서 마우스 위치로 향하는 벡터 시각화
  line(pos.x, pos.y, target.x, target.y); // target을 사용하여 선을 그림

  // 가속도 벡터 시각화
  stroke('red');
  line(pos.x, pos.y, pos.x + 100 * acc.x, pos.y + 100 * acc.y); // 가속도 벡터를 크게 시각화

  // 속도 벡터 시각화
  stroke('blue');
  line(pos.x, pos.y, pos.x + 10 * vel.x, pos.y + 10 * vel.y); // 속도 벡터를 크게 시각화
}
