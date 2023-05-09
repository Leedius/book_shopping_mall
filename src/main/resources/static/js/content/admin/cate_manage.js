
function regCategory() {
	//카테고리명이 빈 값인지 확인
	const cateNameTag = document.querySelector('#cateName');
	if (cateNameTag.value == '') {
		alert('카테고리명은 필수입니다.');
		//리턴만나는 순간 함수 종료
		return;
	}

	//카테고리 중복 확인
	if (checkCateName(cateNameTag.value)) {
		alert('카테고리명이 중복이에요.\n다시 입력하세요.');
		cateNameTag.value = '';
		return;
	};

	//사용중, 미사용 체크시 데이터 값 변경
	//isUseRadio(cateCode);

	//ajax start
	$.ajax({
		url: '/admin/regCategoryAjax', //요청경로
		type: 'post',
		data: { 'cateName': cateNameTag.value }, //필요한 데이터
		success: function(result) {
			alert('카테고리 등록 완료');

			//카테고리 목록 데이터 다시 조회
			getCateListAjax();

			cateNameTag.value = '';
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end	
}

//카테고리 등록시 이름 중복 확인
function checkCateName(cateName) {
	let isDuplicate = false; //중복 아니다.
	//ajax start
	$.ajax({
		url: '/admin/checkCateNameAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'cateName': cateName }, //필요한 데이터
		success: function(result) {
			//여기서 리턴값을 입력하면
			//checkCateName이라는 함수 안의 success라는 함수 안에 있기 때문에 
			//return 값을 주지 못한다.
			//카테고리명 중복 시
			if (result == 1) {
				isDuplicate = true;
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end	

	return isDuplicate;
}

//카테고리 등록 후 실행되는 목록 조회 기능
function getCateListAjax() {
	//ajax start
	$.ajax({
		url: '/admin/getCateListAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {}, //필요한 데이터
		success: function(result) {
			//카테고리 목록 테이블의 tbody 태그를 선택
			const tbodyTag = document.querySelector('#cateListTable tbody');

			tbodyTag.replaceChildren();

			let str = '';

			for (let i = 0; i < result.length; i++) {
				str += '<tr>'
				str += `<td>${i + 1}</td>`;
				str += `<td>${result[i].cateName}</td>`;
				str += '<td>';
				str += '<div class="row">';
				str += `<div class="form-check col-6">`;
				if (result[i].isUse == 'Y') {
					str += `<input name="isUse_${i + 1}" type="radio" class="form-check-input isUse" onchange='isUseRadio("${result[i].cateCode}");' checked>사용중`;
				}
				else {
					str += `<input name="isUse_${i + 1}" type="radio" class="form-check-input isUse" onchange='isUseRadio("${result[i].cateCode}");'>사용중`;
				}
				str += '</div>';
				str += '<div class="form-check col-6">';
				if (result[i].isUse == 'N') {
					//중요!! 자바 스크립트에서는 ()안의 데이터값에 
					//cateCode는 문자열이기 때문에 꼭 "" 붙인다.
					//onchange='isUseRadio("${result[i].cateCode}");'
					str += `<input name="isUse_${i + 1}" type="radio" class="form-check-input isUse" onchange='isUseRadio("${result[i].cateCode}");' checked>미사용`;
				}
				else {
					str += `<input name="isUse_${i + 1}" type="radio" class="form-check-input isUse" onchange='isUseRadio("${result[i].cateCode}");'>미사용`;
				}
				str += '</div>';
				str += '</div>';
				str += '</td>';
				str += `<td>${result[i].orderNum}</td>`;
				str += `<td><span class="deleteCate" onclick='deleteCategory("${result[i].cateCode}");'>삭 제</span></td>`;
				str += '</tr>'
			}
			tbodyTag.insertAdjacentHTML("afterbegin", str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}



//카테고리 삭제
function deleteCategory(cateCode) {
	if (!confirm('정말로 삭제 하시겠습니까?')) {
		return false;
	}
	location.href = '/admin/deleteCategory?cateCode=' + cateCode;
}

//사용중, 미사용 체크시 데이터 값 변경
function isUseRadio(cateCode) {
	//ajax start
	$.ajax({
		url: '/admin/updateIsUseAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'cateCode': cateCode }, //필요한 데이터
		success: function(result) {
			if (result == 1) {
				alert('사용여부가 변경되었습니다.');
			}
			else {
				alert('일시적 오류가 발생했습니다.');
			}

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}

//뒤로가기시 페이지 막기 
/*function CheckSession() {
	if (sessionStorage.getItem("loginKey") == null) {
		window.location = "로그인화면주소";
	}
	setInterval(CheckSession(), 100);
}*/




