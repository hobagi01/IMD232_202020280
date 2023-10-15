let aVariable = 20;
let anArray = [30, 60, 90];
let anotherArray = [];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  console.log(aVariable);
  console.log('anArray', anArray);
  console.log('anArray[0]', anArray[0]); //0,1,2 순일 것
  console.log('anArray[1]', anArray[1]);
  console.log('anArray[2]', anArray[2]);
  console.log('anArray.length', anArray.length);
  console.log('anotherArray.length', anotherArray.length); //아직 아무것도 없는 상태
  console.log('anotherArray', anotherArray[0]); //그런 정보 없다고 뜸
  console.log('anotherArray', anotherArray[1]); //그런 정보 없다고 뜸
  anotherArray.push('어레이에 넣은 첫 데이터'); // 정보를 push로 넣음
  console.log('anotherArray[0]', anotherArray[0]); //그 이후부터는 값이 나올 수 있게 됨
  anotherArray.push(50);
  console.log('anotherArray[1]', anotherArray[1]);

  background(255);
}
function draw() {}
