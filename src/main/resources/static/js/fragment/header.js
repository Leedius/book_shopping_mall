
//초기 작업 실행
init();

//회원가입 함수
function join() {
	console.log(memIdValidate(), memPwValidate(), checkPwValidate(), memNameValidate(), memTellValidate());
	if (memIdValidate() && memPwValidate() && checkPwValidate() && memNameValidate() && memTellValidate()) {
		//회원가입 진행	
		document.querySelector('#joinForm').submit();
	}
	else {
		memIdValidate();
		memPwValidate();
		checkPwValidate();
		memNameValidate();
		memTellValidate()
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
	const inputDivs = document.querySelectorAll('#joinForm input');
	for (const inputDiv of inputDivs) {
		inputDiv.style.border = '';
	}
}


//-------------------회원가입 데이터 유효성 검사---------------------------------//

//무결성 검사 하기전 회원가입 form 태그 선택
const divs = document.querySelectorAll('#joinForm > div');

//아이디 중복 검사 

function isDuplicateMemId() {
	let booleanDuplicateMemId
	const memIdTag = document.querySelector('#joinModal #memId'); //아이디값
	const memId = memIdTag.value;
	//ajax start
	$.ajax({
		url: '/member/isDuplicateMemId', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'memId': memId }, //필요한 데이터
		success: function(result) {
			if (result) {
				booleanDuplicateMemId = true;
			}
			else {
				booleanDuplicateMemId = false;
			}
		},
		error: function() {
			alert('실패');
		}
	})
	return booleanDuplicateMemId;
}


//아이디 무결성 검사
function memIdValidate() {

	//추가된 경고값 태그 초기화
	const errorDiv = document.querySelector('#memIdValidate')
	if (errorDiv != null) {
		errorDiv.remove();
	}

	//함수의 리턴 결과를 저장하는 변수
	let result_memId = false;

	//오류메세지
	let str_memId = '';

	//아이디 입력값 가져오기
	const memIdInput = document.querySelector('#joinForm #memId');
	const memId = memIdInput.value;

	if (memId == '') {
		str_memId = 'ID는 필수 입력입니다.';
		memIdInput.style.border = '1px solid red';
		result_memId = false;
	}
	else if (memId.match(/^[a-zA-Z0-9]{4,16}$/) == null) {
		str_memId = 'ID는 영문 대소문자와 숫자로 이루어진 4~16자리여야 합니다.';
		memIdInput.style.border = '1px solid red';
		result_memId = false;
	}
	else if (isDuplicateMemId()) {
		str_memId = '아이디가 중복 입니다.';
		memIdInput.style.border = '1px solid red';
		result_memId = false;
	}
	else {
		memIdInput.style.border = '';
		result_memId = true;
	}

	if (!result_memId) {
		const errorHTML = `<div id="memIdValidate" class="my-invalid">${str_memId}</div>`;
		divs[0].insertAdjacentHTML('afterend', errorHTML);
	}
	return result_memId;
}

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
	const memPwInput = document.querySelector('#joinForm #memPw');
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
		divs[1].insertAdjacentHTML('afterend', errorHTML);
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
	const checkPwInput = document.querySelector('#joinForm #checkPw');
	const checkPw = checkPwInput.value;

	//비밀번호 확인 입력값을 비교하기 위에 입력해논 비밀번호 값 가져오기
	const memPwInput = document.querySelector('#joinForm #memPw');
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
		divs[2].insertAdjacentHTML('afterend', errorHTML);
	}

	return result_checkPw;
}

//이름 무결성 검사
function memNameValidate() {

	//추가된 경고값 태그 초기화
	const errorDiv = document.querySelector('#memNameValidate')
	if (errorDiv != null) {
		errorDiv.remove();
	}

	//함수의 리턴 결과를 저장하는 변수
	let result_memName = false;

	//오류메세지
	let str_memName = '';

	//이름 입력값 가져오기
	const memNameInput = document.querySelector('#joinForm #memName');
	const memName = memNameInput.value;

	if (memName == '') {
		str_memName = '이름은 필수 입력입니다.';
		memNameInput.style.border = '1px solid red';
		result_memName = false;
	}
	else if (memName.length > 10) {
		str_memName = 'ID는 10글자 이하이어야 합니다.';
		memNameInput.style.border = '1px solid red';
		result_memName = false;
	}
	else {
		memNameInput.style.border = '';
		result_memName = true;
	}

	if (!result_memName) {
		const errorHTML = `<div id="memNameValidate" class="my-invalid">${str_memName}</div>`;
		divs[3].insertAdjacentHTML('afterend', errorHTML);
	}

	return result_memName;
}


//전화번호 무결성 검사
function memTellValidate() {

	//추가된 경고값 태그 초기화
	const errorDiv = document.querySelector('#memTellValidate')
	if (errorDiv != null) {
		errorDiv.remove();
	}

	//함수의 리턴 결과를 저장하는 변수
	let result_memTell = false;

	//오류메세지
	let str_memTell = '';

	//이름 입력값 가져오기
	const memTell1Input = document.querySelector('#joinForm #memTell_1');
	const memTell1 = memTell1Input.value;
	const memTell2Input = document.querySelector('#joinForm #memTell_2');
	const memTell2 = memTell2Input.value;
	const memTell3Input = document.querySelector('#joinForm #memTell_3');
	const memTell3 = memTell3Input.value;

	if (memTell2 == '' && memTell3 == '') {
		str_memTell = '전화번호는 필수 입력입니다.';
		memTell2Input.style.border = '1px solid red';
		memTell3Input.style.border = '1px solid red';
		result_memTell = false;
	}
	else if (!memTell2.match(/^[0-9]{3,4}$/) || !memTell3.match(/^[0-9]{4}$/)) {
		str_memTell = '전화번호가 제대로 입력 되지 않았습니다.';
		if (!memTell2.match(/^[0-9]{3,4}$/)) {
			memTell2Input.style.border = '1px solid red';
		} else {
			memTell2Input.style.border = '';
		}
		if (!memTell3.match(/^[0-9]{4}$/)) {
			memTell3Input.style.border = '1px solid red';
		} else {
			memTell3Input.style.border = '';
		}
		result_memTell = false;
	}
	else {
		memTell2Input.style.border = '';
		memTell3Input.style.border = '';
		result_memTell = true;
	}

	if (!result_memTell) {
		const errorHTML = `<div id="memTellValidate" class="my-invalid">${str_memTell}</div>`;
		divs[9].insertAdjacentHTML('afterend', errorHTML);
	}

	return result_memTell;
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



//회원가입 버튼 비활성화
function setDisabled() {
	document.querySelector('#joinBtn').disabled = true;
}

//로그인
function login() {
	//const loginData = $("#loginForm").serialize();
	const memId = document.querySelector('#loginForm #memId').value;
	const memPw = document.querySelector('#loginForm #memPw').value;
	//ajax start
	$.ajax({
		url: '/member/login', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: { 'memId': memId, 'memPw': memPw }, //필요한 데이터
		success: function(result) {
			if (result == 'fail') {
				swal.fire({
					title: "로그인 실패",
					text: "아이디 또는 비밀번호가 잘못 되었습니다",
					icon: 'error',
					button: '확인',
				})
				//id, pw input 태그 초기화
				document.querySelectorAll('#loginModal input:not([type="button"])').forEach(function(t, index) {
					t.value = '';
				});
				
				//경고창 메세지 띄우기
				if (document.querySelector('#loginErrorDiv').querySelector('div') == null) {
					const error_div = document.querySelector('#loginErrorDiv');

					let str = '';
					str += `<div style="color: red; font-size: 0.9rem; text-align: left;">`
					str += `로그인 정보를 확인하세요.`
					str += `</div>`

					error_div.insertAdjacentHTML('beforeend', str);
				}
			}
			else if (result == 'success') {
				swal.fire({
					title: "로그인 성공",
					icon: 'success',
					button: '확인',
				})
					.then((result) => {
						if (result) {
							location.href = '/';
						}
					})
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}

//비밀번호 찾기 모달창
function findPwModal(){
	const find_modal_tag = document.querySelector('#findPwModal');
	const find_modal = new bootstrap.Modal(find_modal_tag);
	
	document.querySelector('#loginModal').hidden = true;
	
	find_modal.show();
	
	find_modal_tag.addEventListener('hidden.bs.modal', function() {
		document.querySelector('#loginModal').hidden = false;
	});
}

//비밀번호 찾기
function findPw(){
	const mem_id = document.querySelector('#findPwForm #memId').value;
	const mem_pw = document.querySelector('#findPwForm #memName').value;
	
	if(mem_id == '' || mem_pw == ''){
		swal.fire({
			title: "아이디와 이름은 필수 입력입니다",
			icon: 'warning',
			button: '확인'
		})
		return;
	}
	else{
		document.querySelector('#findPwForm').submit();
	}
}

//비밀번호 찾기(ajax이용)
function findPwAjax(btn){
	
	//경고메세지 지우기
	if(document.querySelector('#error_find_div').querySelector('div') != null){
		document.querySelector('.error_findPw').remove();	
	}
	
	btn.disabled = true;
	btn.querySelector('span').textContent = '로딩중';
	const spinner = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
	btn.insertAdjacentHTML('afterbegin', spinner);
	
	//ajax start
	$.ajax({
		url: '/member/findPwAjax', //요청경로
		type: 'post',
		async: false,
		data: $('#findPwForm').serialize(),
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			if(result){
				swal.fire({
					title:'임시비밀 번호가 전송되었습니다',
					text:'로그인하여 비밀번호를 변경하여 주세요',
					icon:'success',
					button:'확인'
				})
				
			}
			else{
				let str = '';
				str += '<div class="col-12 mt-0 error_findPw" style="text-align:left; font-size:0.9rem; color:red;">';
				str += '<span>'
				str += 'ID와 이름을 확인하세요.'
				str += '</span>'
				str += '</div>'
				
				if(document.querySelector('#error_find_div').querySelector('div') == null){
					document.querySelector('#error_find_div').insertAdjacentHTML('beforeend', str);	
				}
				
				btn.disabled = false;
				btn.querySelector('span:first-child').remove();
				btn.querySelector('span').textContent = '비밀번호 찾기';
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
	
}



//로그아웃
function logout() {
	if (!confirm('정말로 로그아웃 하시겠습니까?')) {
		return;
	}
	else {
		alert('로그아웃 되었습니다.');
		location.href = '/member/logout';
	}
}

//서브 메뉴 불러오기
function subMenu(menuCode) {
	alert(menuCode);
	location.href = '/admin/cateManage=menuCode' + menuCode;
}

//선택한 카테고리 상품 목록 조회
function getSelectCateItemList(cateCode) {
	if (cateCode != null) {
		location.href = '/item/itemList?cateCode=' + cateCode;
	}
	else {
		location.href = '/item/itemList';
	}
}

//관리자 메인메뉴 이동
function adminSubMenu(menuCode) {
	if (menuCode == 'MENU_001') {
		location.href = '/admin/cateManage?menuCode=' + menuCode;
	}
	//	if(menuCode == 'MENU_002'){
	//		location.href = '?menuCode=' + menuCode;
	//	}
	if (menuCode == 'MENU_003') {
		location.href = '/admin/orderManage?menuCode=' + menuCode;
	}
}


//-- 함수 선언 --//
function init() {
	//로그인 모달창(태그) 선택
	const loginModal = document.getElementById('loginModal');
	
	//비밀번호 찾기 모달창(태그) 선택
	const findPwModal = document.getElementById('findPwModal');

	//로그인 모달창이 닫힐 때 마다 실행되는 이벤트
	loginModal.addEventListener('hidden.bs.modal', function(e) {
		//로그인 모달창 안의 모든 input태그 초기화
		document.querySelector('#loginForm').reset();
		deleteErrorDiv();
		resetBorderColor();
		//로그인 실패 시 추가되는 div 태그 삭제
		const error_div = document.querySelector('#loginErrorDiv').querySelector('div');
		if(error_div != null){
			error_div.remove();
		}
	});
	
	//비밀번호 찾기 모달창이 닫힐 때 마다 실행되는 이벤트
	findPwModal.addEventListener('hidden.bs.modal', function(event){
		
		console.log(event.target);
		const find_pw_modal_div = event.target;
		//비밀번호 찾기 모달창 안의 모든 input태그 초기화 및 에러 메세지 태그 삭제
		document.querySelector('#findPwForm').reset();
		if(find_pw_modal_div.querySelector('#error_find_div').querySelector('div') != null){
			document.querySelector('.error_findPw').remove();	
		}
		
		
		//button속성 disabled 삭제
		find_pw_modal_div.querySelector('#button').disabled = false;
		//버튼 글자 바꾸기
		find_pw_modal_div.querySelector('#button').querySelector('span:last-child').textContent = '비밀번호 찾기';
		//spinner태그 삭제
		if(find_pw_modal_div.querySelector('#button').children.length > 1)
		find_pw_modal_div.querySelector('#button').firstElementChild.remove(); 
	})

	//회원가입 모달창(태그) 선택
	const joinModal = document.getElementById('joinModal');

	joinModal.addEventListener('show.bs.modal', function(e) {
		//회원가입 모달창 안의 모든 input태그 초기화
		document.querySelector('#joinForm').reset();
		deleteErrorDiv();
		resetBorderColor()
	});

	joinModal.addEventListener('hidden.bs.modal', function(e) {
		//회원가입 모달창 안의 모든 input태그 초기화
		document.querySelector('#joinForm').reset();
		deleteErrorDiv();
		resetBorderColor()
	});
}



/* 아이디 중복 체크
function isDuplicateMemId() {
	//입력 하는 아이디값
	const memIdTag = document.querySelector('#joinModal #memId'); //아이디값
	const memId = memIdTag.value;
	const pattern = /^[a-zA-Z0-9]{3,16}$/; // 영문 대소문자, 숫자 4~16자리

	if (memId == '') {
		alert('아이디를 입력해주세요');
		return;
	}

	if (memId.match(pattern) == null) {
		alert('아이디는 영문 대소문자와 숫자로 이루어진 4~16자리여야 합니다.');
		return;
	}
	//ajax start
	$.ajax({
		url: '/member/isDuplicateMemId', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'memId': memId }, //필요한 데이터
		success: function(result) {
			if (result) {
				alert('아이디가 중복 입니다.');
			}
			else {
				alert('사용가능한 아이디 입니다.');
				//회원가입 버튼 활성화를 위해 true값 리턴
				booleanDuplicateMemId = true;
				console.log(booleanDuplicateMemId);
				return true;
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}
*/

/* ---------------------------- 회원가입 버튼을 누를시 유효성 검사
	
//회원 가입 진행 시 데이터 유효성 검사
function joinValidate() {
	
	deleteErrorDiv();
	resetBorderColor();
	
	//함수의 리턴 결과를 저장하는 변수
	let result_memId = true;
	let result_memPw = true;
	let result_checkPw = true;
	
	//오류메세지
	let str_memId = '';
	let str_memPw = '';
	let str_checkPw = '';
	
	//회원가입 form 태그 선택
	const divs = document.querySelectorAll('#joinForm > div');
	
	//------------ ID ----------------//	
	const memId = document.querySelector('#joinModal #memId').value;
	const memIdInput = document.querySelector('#joinModal #memId');
	if (memId == '') {
		str_memId = 'ID는 필수 입력입니다.';
		memIdInput.style.border = '1px solid red';
		result_memId = false;
	}
	else if (memId.length < 4) {
		str_memId = 'ID는 4글자 이상이여야 합니다.';
		memIdInput.style.border = '1px solid red';
		result_memId = false;
	}
	
	//------------ PW ----------------//
	const memPw = document.querySelector('#joinModal #memPw').value;
	const memPwInput = document.querySelector('#joinModal #memPw');
	//문자 + 숫자의 6~12자리의 글자인지 체크하는 정규식
	//정규식에 부합하지 않으면 null 리턴
	const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,12}$/;
	//const aaa = memPw.match(regExp);
	//alert(aaa);
	
	if (memPw == '') {
		str_memPw = 'PW는 필수 입력입니다.';
		memPwInput.style.border = '1px solid red';
		result_memPw = false;
	}
	else if (memPw.match(regExp) == null) {
		str_memPw = 'PW는 문자와 숫자가 조합된 6~12글자가 입력되어야 합니다.';
		memPwInput.style.border = '1px solid red';
		result_memPw = false;
	}
	
	//PW 재확인 유효성 검사
	const checkPw = document.querySelector('#checkPw').value;
	const checkPwInput = document.querySelector('#checkPw');
	if (checkPw == '') {
		str_checkPw = '비밀번호를 입력해주세요';
		checkPwInput.style.border = '1px solid red';
		result_checkPw = false;
	}
	else if (checkPw != memPw) {
		str_checkPw = '입력한 비밀번호와 같아야합니다.';
		checkPwInput.style.border = '1px solid red';
		result_checkPw = false;
	}
	
	//이름유효성 검사
	const memName = document.qu
	
	//유효성 검사 실패 시 오류 메세지 출력
	if (!result_memId) {
		const errorHTML = `<div class="my-invalid">${str_memId}</div>`;
		divs[1].insertAdjacentHTML('afterend', errorHTML);
	}
	
	if (!result_memPw) {
		const errorHTML = `<div class="my-invalid">${str_memPw}</div>`;
		divs[2].insertAdjacentHTML('afterend', errorHTML);
	}
	
	if (!result_checkPw) {
		const errorHTML = `<div class="my-invalid">${str_checkPw}</div>`;
		divs[3].insertAdjacentHTML('afterend', errorHTML);
	}
	
	return result_memId && result_memPw && result_checkPw;
}  ------------------------------------------------------------------        */

