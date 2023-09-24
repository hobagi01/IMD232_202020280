let pos;
let vel;
let acc;
let cv;
let cvTomv;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  background(255);
  pos = createVector(random(width), random(height)); // 무작위 초기 위치 설정
  vel = createVector(0, 0);
  acc = p5.Vector.random2D().mult(0.1);
  cv = createVector(width / 2, height / 2);
  cvTomv = createVector();
}

function draw() {
  background(255);
  strokeWeight(2);

  // 매 프레임마다 무작위 방향의 가속도 생성
  acc = p5.Vector.random2D().mult(0.1);
  vel.add(acc).limit(2); // 가속도를 속도에 더하고 상한선을 설정

  // 위치 업데이트
  pos.add(vel);

  // 화면을 벗어나지 않도록 처리
  if (pos.x < 0) {
    pos.x += width;
  } else if (pos.x >= width) {
    pos.x -= width;
  }
  if (pos.y < 0) {
    pos.y += height;
  } else if (pos.y >= height) {
    pos.y -= height;
  }

  // ellipse
  fill(0);
  noStroke();
  ellipse(pos.x, pos.y, 80);

  // line
  strokeWeight(2);
  stroke(0);

  // 중심점에서 마우스 위치로 향하는 벡터 시각화
  cvTomv = p5.Vector.sub(createVector(mouseX, mouseY), cv);
  line(pos.x, pos.y, cv.x + cvTomv.x, cv.y + cvTomv.y);

  // 가속도 벡터 시각화
  stroke('red');
  line(pos.x, pos.y, pos.x + 500 * acc.x, pos.y + 500 * acc.y);

  // 속도 벡터 시각화
  stroke('blue');
  line(pos.x, pos.y, pos.x + 50 * vel.x, pos.y + 50 * vel.y);
}
