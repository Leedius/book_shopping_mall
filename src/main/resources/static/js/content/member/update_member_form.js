

//정보 수정 함수
function update() {
	console.log(memPwValidate(), checkPwValidate());
	if (memPwValidate() && checkPwValidate()) {
		//회원가입 진행
		swal.fire({
			title:'회원정보가 수정되었습니다.',
			icon:'success',
			button:'확인'
		}).then((result) => {
			document.querySelector('#updateForm').submit();
		})
	}
	else {
		memPwValidate();
		checkPwValidate();
		return;
	}
}

//기존의 오류메세지 전부 삭제
function deleteErrorDiv() {
	const errorDivs = document.querySelectorAll('div[class="my-invalid"]');
	for (const errorDiv of errorDivs) {
		errorDiv.remove();
	}
}

//기존 빨간색으로 바꼇던 체크박스 초기화
function resetBorderColor() {
	const inputDivs = document.querySelectorAll('#updateForm input');
	for (const inputDiv of inputDivs) {
		inputDiv.style.border = '';
	}
}


//-------------------회원가입 데이터 유효성 검사---------------------------------//

//무결성 검사 하기전 회원가입 form 태그 선택
const divs = document.querySelectorAll('#updateForm > div');


//비밀번호 무결성 검사
function memPwValidate() {

	//추가된 경고값 태그 초기화
	const errorDiv = document.querySelector('#memPwValidate')
	if (errorDiv != null) {
		errorDiv.remove();
	}

	//함수의 리턴 결과를 저장하는 변수
	let result_memPw = false;

	//오류메세지
	let str_memPw = '';

	//비밀번호 정규식
	const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/;

	//비밀번호 입력값 가져오기
	const memPwInput = document.querySelector('#updateForm #memPw');
	const memPw = memPwInput.value;

	if (memPw == '') {
		str_memPw = 'Pw는 필수 입력입니다.';
		memPwInput.style.border = '1px solid red';
		result_memPw = false;
	}
	else if (memPw.match(regExp) == null) {
		str_memPw = 'PW는 문자와 숫자가 조합된 6~12글자가 입력되어야 합니다.';
		memPwInput.style.border = '1px solid red';
		result_memPw = false;
	}
	else {
		memPwInput.style.border = '';
		result_memPw = true;
	}

	if (!result_memPw) {
		const errorHTML = `<div id="memPwValidate" class="my-invalid">${str_memPw}</div>`;
		divs[0].insertAdjacentHTML('afterend', errorHTML);
	}
	return result_memPw;
}

//비밀번호 체크 무결성 검사
function checkPwValidate() {
	//추가된 경고값 태그 초기화
	const errorDiv = document.querySelector('#checkPwValidate')
	if (errorDiv != null) {
		errorDiv.remove();
	}

	//함수의 리턴 결과를 저장하는 변수
	let result_checkPw = false;

	//오류메세지
	let str_checkPw = '';

	//비밀번호 확인 입력값 가져오기
	const checkPwInput = document.querySelector('#updateForm #checkPw');
	const checkPw = checkPwInput.value;

	//비밀번호 확인 입력값을 비교하기 위에 입력해논 비밀번호 값 가져오기
	const memPwInput = document.querySelector('#updateForm #memPw');
	const memPw = memPwInput.value;

	if (checkPw == '') {
		str_checkPw = 'Pw는 필수 입력입니다.';
		checkPwInput.style.border = '1px solid red';
		result_checkPw = false;
	}
	else if (checkPw != memPw) {
		str_checkPw = '입력한 비밀번호와 같아야합니다.';
		checkPwInput.style.border = '1px solid red';
		result_checkPw = false;
	}
	else {
		checkPwInput.style.border = '';
		result_checkPw = true;
	}

	if (!result_checkPw) {
		const errorHTML = `<div id="checkPwValidate" class="my-invalid">${str_checkPw}</div>`;
		divs[1].insertAdjacentHTML('afterend', errorHTML);
	}

	return result_checkPw;
}


//-------------------회원가입 데이터 유효성 검사 끝!!!!!!!-------------------------//


//우편번호 검색 api 사용
function postcode() {
	new daum.Postcode({
		oncomplete: function(data) {

			var addr = ''; // 주소 변수

			//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				addr = data.roadAddress;
			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				addr = data.jibunAddress;
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.querySelector('#memAddr').value = addr;
			// 커서를 상세주소 필드로 이동한다.
			document.querySelector('#memAddrDetail').focus();
		}
	}).open();
}
