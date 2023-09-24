let posX;
let posY;
let posXAdd = 3;
let posYAdd = -2;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  posX = width / 2;
  posY = height / 2;
  ellipse(posX, posY, 50); //제일 처음에 중앙에 있는 모습을 보여주고 싶을 경우
}
function draw() {
  background(255);
  // posX += 5; // 계산을 그리는 것보다 먼저해주는 것 추천
  // posY += 3;
  posX += posXAdd; // 이게 무슨 값인지 먼저 선언해주는 게 더 좋음(숫자로 나중에 보여주는 것보다)
  posY += posYAdd;
  ellipse(posX, posY, 50);
  //posX++; 값을 1씩 늘리는 방법
  //posY = posX +1;
  // posX +=1;
}
