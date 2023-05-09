
// 상품가격 input 박스에 원 기호 추가하는 JavaScript 코드
document.getElementById("itemPrice").addEventListener("input", function(e) {
	var value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
});

// 재고 input 박스에 원 기호 추가하는 JavaScript 코드
document.getElementById("itemStock").addEventListener("input", function(e) {
	var value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
});

/*
function CheckSession() {
	if (sessionStorage.getItem("loginKey") == null) {
		window.location = "로그인화면주소";
	}
	setInterval(CheckSession(), 100);
*/
