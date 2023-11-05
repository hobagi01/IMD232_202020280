let traffic; // traffic 객체를 생성하는 변수
let infiniteOffset = 80; // infiniteOffset : 변수 초기화

function setup() {
  // setup() 함수 : 스케치 초기 설정을 위한 함수
  setCanvasContainer('canvas', 3, 2, true); //'canvas' 안에 스케치 생성
  colorMode(HSL, 360, 100, 100, 100); // 컬러모드 : HSL
  background('#202020'); // 배경색 : 흰색
  traffic = new Traffic(); // Traffic : 객체 생성
  for (let n = 0; n < 10; n++) {
    // 0~9까지 숫자를 반복적으로 실행함
    traffic.addVehicle(random(width), random(height)); // traffic 객체에 무작위 위치에 차량을 추가함
  }
}

function draw() {
  // draw()함수 : 스케치의 각 프레임을 그리는 함수
  background('#202020'); //배경색 : 흰색
  traffic.run(); // traffic 객체를 실행
}

function mouseDragged() {
  // 마우스를 드래그할 때 호출되는 함수
  traffic.addVehicle(mouseX, mouseY); // 마우스위치에 차량을 추가함
}
