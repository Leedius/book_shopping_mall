//화면 로딩 후 바로 실행
init();

//날짜순, 상태순 버튼의 색상 변경
function init() {
	const order = document.querySelector('#searchOrderBy').value;
	if (order == 'BUY_DATE_ORDER') {
		document.querySelector('#order_buyDate').classList.remove('btn-orderBy');
		document.querySelector('#order_statusCode').classList.add('btn-orderBy');
	}
	else {
		document.querySelector('#order_buyDate').classList.add('btn-orderBy');
		document.querySelector('#order_statusCode').classList.remove('btn-orderBy');
	}
}



//검색 기능
function searchOrder() {

	//폼 태그 선택
	const searchForm = document.querySelector('#searchOrderForm');

	//카테고리 체크확인(하나라도 체크가 되있어야 함)
	//1.체크가 몇개 되었는지 확인
	const checkedCnt = document.querySelectorAll('.searchChk:checked').length;

	//2.체크가 하나도 안되었을 때 경고창
	if (checkedCnt == 0) {
		swal.fire({
			title: "카테고리가 선택 되지 않았습니다",
			text: "카테고리를 선택하여 주세요",
			icon: 'warning',
			button: '확인',
		})
		return;
	}
	searchForm.submit();
}

//검색한 상태에서 검색정보를 가지고 페이지 이동
function searchInfoToGoPaging(nowPage, orderBy) {
	document.querySelector('#nowPage').value = nowPage;
	document.querySelector('#searchOrderBy').value = orderBy;
	
	//폼태그 실행
	searchOrder();
}

//주문 목록 클릭시 주문 상세정보 모달창
function orderModal(buyCode, memId){
	
	//ajax start
	$.ajax({
		url: '/admin/orderDetailModalAjax', //요청경로
		type: 'post',
		async: true, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'buyCode' : buyCode, 'memId' : memId},			//JSON.stringify(classInfo), //필요한 데이터
		//contentType: 'application/json; charset=UTF-8',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			
		console.log(result);
		
		//모달창 생성	
		const modalTag = document.querySelector('#orderDetailModal');
		
		
		//모달 바디 태그 선택
		const modalBodyTag = document.querySelector('#orderModalBody');
		
		//모달 바디 태그 내용 지우기
		modalBodyTag.innerHTML = '';

		let str = '';
	
		str += `<div class="row mb-3">`;
		str += `<div class="col-12">`;
		str += `<table class="table">`;
		str += `<thead>`;
		str += `<tr class="table_thead">`;
		str += `<td>구매코드</td>`;
		str += `<td>구매자ID</td>`;
		str += `<td>구매일</td>`;
		str += `<td>총금액</td>`;
		str += `</tr>`;
		str += `</thead>`;
		str += `<tbody>`;
		str += `<tr>`;
		str += `<td>${result[0].buy_code}</td>`;
		str += `<td>${result[0].mem_id}</td>`;
		str += `<td>${result[0].buy_date}</td>`;
		str += `<td>${result[0].buy_price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</td>`;
		str += `</tr>`;
		str += `</tbody>`;
		str += `</table>`;
		str += `</div>`;
		str += `</div>`;
		str += `<div style="text-left">주문상세 내역`;
		str += `</div>`;
		str += `<div class="row">`;
		str += `<div class="col-12">`;
		str += `<table class="table">`;
		str += `<colgroup>`;
		str += `<col width="15%">`;
		str += `<col width="20%">`;
		str += `<col width="*">`;
		str += `<col width="15%">`;
		str += `<col width="15%">`;
		str += `</colgroup>`;
		str += `<thead>`;
		str += `<tr class="table_thead">`;
		str += `<td>구매상세 코드</td>`;
		str += `<td>상품 이미지</td>`;
		str += `<td>구매상품 이름</td>`;
		str += `<td>구매상세 개수</td>`;
		str += `<td>구매상세 금액</td>`;
		str += `</tr>`;
		str += `</thead>`;
		str += `<tbody>`;
		for (const buyDetail of result[0].buy_detail_list) {
			str += `<tr class="align-middle">`;
			str += `<td>${buyDetail.buy_detail_code}</td>`;
			str += `<td><img src='/upload/images/item/${buyDetail.itemVO.imgList[0].attachedFileName}' width="30%"></td>`;
			str += `<td>${buyDetail.itemVO.itemName}</td>`;
			str += `<td>${buyDetail.buy_cnt}</td>`;
			str += `<td>${buyDetail.detail_buy_price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</td>`;
			str += `</tr>`;
		}
		str += `</tbody>`;
		str += `</table>`;
		str += `</div>`;
		str += `</div>`;
		
		//모달창 내용 채우기
		modalBodyTag.innerHTML = str;
		
		const orderDetailModal = new bootstrap.Modal(modalTag);
		orderDetailModal.show();
		
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

//주문 상태 변경 버튼 클릭 시 실행
function nextLevel(btn, statusCode) {

	//주문 상태에 따른 상태값을 저장하기 위한 변수
	let orderStatusArr = [];
	
	//체크된 체크박스 벨류값
	const checkedBoxes = btn.closest('.row').querySelectorAll('.chk:checked');
	if (checkedBoxes.length != 0) {
		checkedBoxes.forEach(function(chkb, index) {
			orderStatusArr[index] = chkb.value;
		});
	}

	//선택된 주문목록이 없을시 경고창
	if (orderStatusArr.length == 0) {
		swal.fire({
			title: '주문이 선택되지 않았습니다.',
			text: '주문을 선택해 주세요',
			icon: 'error',
			button: '확인'
		})
		return;
	}
	
	//json형식으로 넘길 데이터 작성
	let paramData = {
		'statusCode' : statusCode,
		'orderNumList' : orderStatusArr
	};

	//ajax start
	$.ajax({
		url: '/admin/orderNextLevelAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: JSON.stringify(paramData),			//JSON.stringify(classInfo), //필요한 데이터
		traditional: true,
		contentType: 'application/json; charset=UTF-8',
		//contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			swal.fire({
				title: '작업완료.',
				text: '주문상태가 변경되었습니다.',
				icon: 'success',
			})

			updatePageInfo(btn, result);
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

//주문 상태 변경 후 테이블 다시 그리기
function updatePageInfo2(btn, result) {
	//지울 태그 선택
	const orderStatusTag = document.querySelector('#orderStatusAjax');
	orderStatusTag.innerHTML = '';
	
	console.log(result);

	let str = '';

	// 서버에서 받은 JSON 데이터를 JavaScript의 Map 객체로 변환합니다.
	let resultMap = new Map(Object.entries(result));

	for (let [key, value] of resultMap.entries()) {
		str += `<div class="row table_wrap">`;
		str += `<div>`;
		if (key == 1) {
			str += `신규 주문 내역`;
		}
		if (key == 2) {
			str += `주문 확인 내역`;
		}
		if (key == 3) {
			str += `배송 준비중 내역`;
		}
		if (key == 4) {
			str += `배송중 내역`;
		}
		if (key == 5) {
			str += `배송 완료 내역`;
		}
		str += `</div>`;
		str += `<div class="col-12" style="padding-right: 0;">`;
		str += `<table class="table text-center table-fixed-header mb-0">`;
		str += `<colgroup>`;
		str += `<col width="5%">                                                                                                  `;
		str += `<col width="5%">                                                                                                  `;
		str += `<col width="10%">                                                                                                  `;
		str += `<col width="15%">                                                                                                  `;
		str += `<col width="20%">                                                                                                  `;
		str += `<col width="15%">                                                                                                  `;
		str += `<col width="10%">                                                                                                  `;
		str += `<col width="20%">                                                                                                  `;
		str += `</colgroup>                                                                                                         `;
		str += `<thead class="table_thead">                                                                                         `;
		str += `<tr>                                                                                                            `;
		str += `<td><input type="checkbox" class="form-check-input"                                                         `;
		str += `id="allChk_${key}"></td>                                                               `;
		str += `<td>No</td>                                                                                                 `;
		str += `<td>구매CODE</td>                                                                                           `;
		str += `<td>구매자ID</td>                                                                                           `;
		str += `<td>구매자TELL</td>                                                                                         `;
		str += `<td>결재PRICE</td>                                                                                          `;
		str += `<td>주문STATUS</td>                                                                                         `;
		str += `<td>DATE</td>                                                                                               `;
		str += `</tr>                                                                                                           `;
		str += `</thead>                                                                                                            `;
		str += `</table>                                                                                                            `;
		str += `</div>`;
		str += `<div class="col-12 tbody-wrapper" style="padding-right: 0;">`;
		str += `<table class="table text-center mb-0">`;
		str += `<colgroup>`;
		str += `<col width="5%">                                                                                                  `;
		str += `<col width="5%">                                                                                                  `;
		str += `<col width="10%">                                                                                                  `;
		str += `<col width="15%">                                                                                                  `;
		str += `<col width="20%">                                                                                                  `;
		str += `<col width="15%">                                                                                                  `;
		str += `<col width="10%">                                                                                                  `;
		str += `<col width="20%">                                                                                                  `;
		str += `</colgroup>                                                                                                         `;
		str += `<tbody>`;
		if (value.length == 0) {
			;
			str += `<tr>`;
			str += `<td colspan="7">${key} 내역이 없습니다.</td>`;
			str += `</tr>`;
		} else {
			;
			value.forEach(function(orderInfo, j) {
				str += `<tr class="orderInfo">`;;
				str += `<td><input type="checkbox" class="form-check-input chk_${key}" value="${orderInfo.orderNum}"></td>`;
				str += `<td>${value.length - j}</td>`;
				str += `<td>${orderInfo.buyCode}</td>`;
				str += `<td>${orderInfo.memId}</td>`;
				str += `<td>${orderInfo.memberVO.memTell}</td>`;
				str += `<td>${orderInfo.buyVO.buy_price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</td>`;
				str += `<td>${orderInfo.statusInfoVO.statusName}</td>`;
				str += `<td>${orderInfo.updateDate}</td>`;
				str += `</tr>`;
			});
		};
		str += `</tbody>                                                                                                            `;
		str += `</table>   `;
		str += `</div>   `;
		if (key < resultMap.size) {
			str += `<div class="text-center d-grid button_wrap mb-5">`;
			str += `<input class="btn" type="button"`;

			// Add appropriate values and event handlers based on the current key
			if (key == 1) {
				str += `value="주문접수 -> 주문확인" onclick="nextLevel(${key})">`;
			} else if (key == 2) {
				str += `value="주문확인 -> 배송준비" onclick="nextLevel(${key})">`;
			} else if (key == 3) {
				str += `value="배송준비 -> 배송중" onclick="nextLevel(${key})">`;
			} else if (key == 4) {
				str += `value="배송중 -> 배송완료" onclick="nextLevel(${key})">`;
			}

			str += `</div>`;
		}

		str += `</div>              `;
	}

	//str 태그 삽입
	orderStatusTag.innerHTML = str;
}

//주문 상태 변경 후 테이블 다시 그리기
function updatePageInfo(btn, result){
	
	//첫번째 테이블 
	const select_row = btn.closest('.row');	
	select_row.querySelector('tbody').replaceChildren();
	
	drawTable('firstOrderList', select_row.querySelector('tbody'), result);
	
	//두번째 테이블
	//이동될 테이블 선택
	const next_row = select_row.nextElementSibling;
	next_row.querySelector('tbody').replaceChildren();
	
	drawTable('secondOrderList', next_row.querySelector('tbody'), result);
	
}

//테이블 다시 그리기
function drawTable(key_name, p_tag, result){
	let str = '';
	
	if(result[key_name].size == 0){
		str += `<tr>                                                                             `
		str += `<td colspan="7">내역이 없습니다.</td>`
		str += `</tr>                                                                            `
	}
	else{
		result[key_name].forEach(function(orderInfo, i){
			str += `<tr class="orderInfo">`;;
			str += `<td><input type="checkbox" class="form-check-input chk" value="${orderInfo.orderNum}"></td>`;
			str += `<td>${result[key_name].length - i}</td>`;
			str += `<td>${orderInfo.buyCode}</td>`;
			str += `<td>${orderInfo.memId}</td>`;
			str += `<td>${orderInfo.memberVO.memTell}</td>`;
			str += `<td>${orderInfo.buyVO.buy_price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</td>`;
			str += `<td>${orderInfo.statusInfoVO.statusName}</td>`;
			str += `<td>${orderInfo.updateDate}</td>`;
			str += `</tr>`;
		})
	}
	//업데이트한 테이블 그리기
	p_tag.insertAdjacentHTML('afterbegin', str);
	
}



//------------------------------- 이벤트 -------------------------//


//검색기능 주문상태 체크박스 이벤트
//1. 주문상태 체크박스 전체 선택, 전체 해제 이벤트
//1-1. 제목줄에 있는 체크박스를 선택
const searchAllCheck = document.querySelector('#searchAllChk');

//1-2. 체크박스에 클릭 시 실행되는 이벤트 추가
searchAllCheck.addEventListener('click', function() {
	//제목 줄 체크박스의 체크 여부
	const isChecked = searchAllCheck.checked;

	//체크 됐을때
	if (isChecked) {
		//카테고리 목록에 있는 모든 체크박스를 선택
		const checkboxes = document.querySelectorAll('.searchChk');

		//체크 박스에 체크속성주기
		//예시 checkbox.checked = true;

		//가져온 체크박스의 개수만큼 반복.
		for (const checkbox of checkboxes) {
			checkbox.checked = true;
		}
	}
	//체크 해제 됐을때 
	else {
		//카테고리 목록에 있는 모든 체크박스를 선택
		const checkboxes = document.querySelectorAll('.searchChk');
		//가져온 체크박스의 개수만큼 반복.
		for (const checkbox of checkboxes) {
			checkbox.checked = false;
		}
	}
});

//2. 내용부의 체크박스에 따라 제목줄 체크박스 체크 여부 변경
//2-1. 내용부에 있는 체크박스들 선택
const checkboxes = document.querySelectorAll('.chk');

//2-2. 모든 체크박스 각각의 이벤트 추가
for (const checkbox of checkboxes) {
	checkbox.addEventListener('click', function() {
		//전체체크박스 개수
		const totalCnt = checkboxes.length;
		//체크가 된 체크박스의 개수
		const checkedCnt = document.querySelectorAll('.chk:checked').length;

		if (totalCnt == checkedCnt) {
			document.querySelector('#allChk').checked = true;
		}
		else {
			document.querySelector('#allChk').checked = false;
		}
	});
}


//전체 체크박에 체크에 따른 주문 리스트 체크 박스 체크
function allCheck(checkbox) {
	//체크박스들 선택
	const checkboxes = checkbox.closest('.row').querySelectorAll('.chk');
	//제목 줄 체크박스의 체크 여부
	const isChecked = checkbox.closest('.row').querySelector('#allChk');

	//체크 됐을때
	if (isChecked.checked) {
		//가져온 체크박스의 개수만큼 반복.
		for (const checkbox of checkboxes) {
			checkbox.checked = true;
		}
	}
	//체크 해제 됐을때 
	else {
		//가져온 체크박스의 개수만큼 반복.
		for (const checkbox of checkboxes) {
			checkbox.checked = false;
		}
	}
}

//주문 리스트 체크박스 여부에 따른 전체 체크박스 체크
function chkboxClick(checkbox){
	//체크박스들 선택
	const checkboxes = checkbox.closest('.row').querySelectorAll('.chk');
	
	//전체체크박스 개수
	const totalCnt = checkboxes.length;
	//체크가 된 체크박스의 개수
	const checkedCnt = checkbox.closest('.row').querySelectorAll('.chk:checked').length;
	
	if (totalCnt == checkedCnt) {
		checkbox.closest('.row').querySelector('#allChk').checked = true;
	}
	else {
		checkbox.closest('.row').querySelector('#allChk').checked = false;
	}
}
