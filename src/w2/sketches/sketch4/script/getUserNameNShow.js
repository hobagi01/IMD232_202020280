let userName = prompt('너의 이름은?', '홍길동');
let isUserNameCorrect = confirm('당신의 이름이 ' + userName + '이 맞습니까?');
if (isUserNameCorrect == true) {
  document.getElementById('user-name-goes-here').textContent =
    '환영합니다. ' + userName + '님';
}
