alert('안녕하세요? 혜영이의 홈페이지에 오신 것을 환영합니다.');
prompt('샌즈 아시나요?');
let userInputFromPrompt;
userInputFromPrompt = prompt('당신의 이름은?', '홍길동');
confirm('와 아시는구나 샌즈!');
let confirmVal = confirm('ㅇㅇ 너의 이름은 ' + userInputFromPrompt + '이구나.');
if (confirmVal == true) {
  alert('환영합니다 ' + userInputFromPrompt + '님.');
}
