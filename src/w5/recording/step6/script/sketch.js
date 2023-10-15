function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
  line(200, 0, 200, height);
  line(0, 100, width, 100);

  push();
  translate(width / 2, height / 2); //ohp 필름 이동시킴
  rotate((TAU / 360) * 25); // translate 먼저하고 rotate를 할 것 (이건 무조건! 필수임)
  noStroke();
  fill('salmon');
  rect(0, 0, 50);
  stroke('salmon');
  line(200, 0, 200, height);
  line(0, 100, width, 100);
  pop(); //pop : 초반의 것 싹 무용화하는 것 // push, pop이 없으면 무용화가 안돼서 계속 그 위에 겹쳐짐

  //   rotate((TAU / 360) * -25);
  //   translate(-width / 2, -height / 2); // 이게 없으면 push(), pop()을 꼭 넣어줄 것

  translate(200, 100);
  rotate((TAU / 360) * -15);
  noStroke();
  fill('slatblue');
  rect(0, 0, 50);
  rect(100, 100, 50);
}

function draw() {}

//회전은 어느 점을 기준으로 하냐에 따라 상이한 결과를 보여줌
