let dom;
let htmlDom;
let canvasW = 600;
let canvasH = 400;

function setup() {
  dom = select('#hereGoesMyP5Sketch'); //좀더 쉽게 부르기 위해 변수를 만듦
  //   console.log('p5 select', dom);
  //   console.log('p5 select', dom.width);

  htmlDom = document.querySelector('#hereGoesMyP5Sketch');
  //   console.log('querySelector', htmlDom);
  //   console.log('querySelector', htmlDom.clientWidth);
  let canvas = createCanvas(canvasW, canvasH);
  canvas.parent(dom);
  background('black');
}

function draw() {}

function windowResized() {
  //   dom = select('#hereGoesMyP5Sketch'); //좀더 쉽게 부르기 위해 변수를 만듦
  //   console.log('p5 select', dom);
  //   console.log('querySelector', htmlDom.clientWidth); // querySelect 방식이 편함
  if (htmlDom.clientWidth < canvasW) {
    console.log('리사이즈됩니다');
    resizeCanvas(
      htmlDom.clientWidth,
      (htmlDom.clientWidth * canvasH) / canvasW
    ); // 캔버스 원래 너비보다 화면이 작을 경우, 줄인 화면에 맞게 줄여지도록 해라.
    background('black');
  } else if (width !== canvasW) {
    console.log('리사이즈됩니다');
    // else : 그러지 않은 상황 / 똑같거나 더 클때, 근데 그 중에서도 / 초기 캔버스 너비보다 똑같지 않으면, 똑같이 해라./ 계속 다시 리사이즈 하기 때문에
    resizeCanvas(canvasW, canvasH);
    background('black');
  }
}
