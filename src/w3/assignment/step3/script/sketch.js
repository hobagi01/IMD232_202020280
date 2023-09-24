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

  // 클릭 여부 확인

  if (mouseIsPressed) {
    // 클릭한 경우, ellipse가 마우스로부터 반대 방향으로 이동
    acc = p5.Vector.sub(cv, createVector(mouseX, mouseY)).mult(0.1);
  } else {
    // 클릭하지 않은 경우, ellipse가 중심점으로부터 가까워짐
    acc = p5.Vector.sub(createVector(mouseX, mouseY), cv).mult(0.1);
  }

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
  line(pos.x, pos.y, mouseX, mouseY);

  // 가속도 벡터 시각화
  stroke('red');
  line(pos.x, pos.y, pos.x + 10 * acc.x, pos.y + 10 * acc.y);

  // 속도 벡터 시각화
  stroke('blue');
  line(pos.x, pos.y, pos.x + 10 * vel.x, pos.y + 10 * vel.y);
}
