let angle = 0;
// let angleVel = (TAU / 360) * 1; // TAU는 setup이나 draw 안에 들어가야 함
let angleVel;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);
  //   angleVel = (TAU / 360) * 1; //화면 회전시키기
  angleVel = 0; //화면 회전시키기
  angleAcc = (TAU / 360) * 0.01; //화면 회전시키기

  background(255);
}

function draw() {
  angleVel += angleAcc;
  angleVel = constrain(angleVel, -5, 5);
  angle += angleVel;

  background(255);

  translate(width / 2, height / 2);
  rotate(angle); // 각도 계속 변환 가능
  //   line(0, 0, 50, 0);
  //   line(0, 0, -50, 0);
  line(-100, 0, 100, 0);
  ellipse(0, 0, 20);
}

// 회전을 애니메이션으로 만드는 방법
