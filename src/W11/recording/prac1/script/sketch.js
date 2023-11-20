let cam;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  //   createCanvas(800, 300);
  cam = createCapture(VIDEO); //불러오는 것
  //   cam.size(160, 240);
  // 화질을 점점 줄이는 법 (숫자를 줄이기) (16,24)
  cam.hide();
  console.log(cam);
  //   noLoop();
}

function draw() {
  background('white');
  image(cam, 0, 0, width, (cam.height / cam.width) * width); // 이미지 크기를 줄일수 있음
  cam.loadPixels();
  for (let y = 0; y < cam.height; y++) {
    for (let x = 0; x < cam.width; x++) {
      const idx = cam.width * y + x;
      const color = cam.pixels[idx]; // 픽셀값 Color에 저장
      const brightness = brightness(color);
      ellipse(x, y, (brightness / 255) * 20);
    }
  }
}
