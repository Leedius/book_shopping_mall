
//상품 총 가격
function sumPrice(itemPrice, inputElement, itemStock, index) {

	//카트에 등록된 각 상품의 수량
	let purchaseQuantities = document.querySelectorAll('#purchaseQuantity');

	//카트에 등록된 각 상품의 수량에 따른 총가격 태그
	const sumPrices = document.querySelectorAll('#sumPrice');

	//한개의 상품의 총가격
	let sumPrice;

	// -가 입력되었을 때와 숫자가아닌 다른게 입력 되었을 때 1로 초기화
	//if (parseInt(inputElement.value) < 1) {
	//	inputElement.value = 1;
	//}
	if (parseInt(inputElement.value) > itemStock) {
		inputElement.value = itemStock;
		alert('재고가 부족합니다');
	}
	if (inputElement.value.match(/[1-9]/g) == null) {
		inputElement.value = 1;
	}

	//총 가격	
	for (let i = 0; i < sumPrices.length; i++) {
		if (index == i) {
			sumPrice = purchaseQuantities[i].value * itemPrice
			if (sumPrice < 0) {
				sumPrice = 0
			}
			sumPrices[i].textContent = sumPrice.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });
		}
	}
	checkBox();
}

//상품 수량 수정
function updateItemQuantity(cartCode, purchaseQuantity) {
	const purQuantity = purchaseQuantity.parentElement.previousElementSibling.children[0].value;
	location.href = '/cart/updateCart?cartCode=' + cartCode + '&cartCnt=' + purQuantity;
}

//카트 상품 삭제
function delCartItem(cartCode) {
	swal.fire({
		title: "선택한 상품을 삭제하시겠습니까?",
		icon: 'warning',

		showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
		confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
		cancelButtonText: '취소', // cancel 버튼 텍스트 지정
	})
		.then((result) => {
			if (result.isConfirmed) {
				swal.fire('삭제가 완료되었습니다.', '', 'success', '확인')
					.then((result) => {
						location.href = '/cart/delCartItem?cartCode=' + cartCode;
					})

			}
		})
}

//선택삭제 버튼 클릭 시 실행
function deleteCarts() {
	//체크된 체크박스들 가져오기
	const checkedBoxes = document.querySelectorAll('.chk:checked')

	//선택한 품목이 없을시
	if (checkedBoxes.length == 0) {
		swal.fire('선택한 품목이 없습니다.', '', 'error', '확인');
		return;
	}

	swal.fire({
		title: "선택한 상품을 삭제하시겠습니까?",
		icon: 'warning',

		showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
		confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
		cancelButtonText: '취소', // cancel 버튼 텍스트 지정
	})
		.then((result) => {
			if (result.isConfirmed) {
				swal.fire('삭제가 완료되었습니다.', '', 'success', '확인')
					.then((result) => {
						//cartCode를 여러개 담을 수 있는 배열 생성
						const cartCodeArr = [];
						checkedBoxes.forEach(function(chkb, index) {
							cartCodeArr[index] = chkb.value;
						});
						console.log(cartCodeArr);
						location.href = `/cart/deleteCarts?cartCodes=${cartCodeArr}`
					})
			}
		})

	//cartCode를 여러개 담을 수 있는 배열 생성
	const cartCodeArr = [];
	checkedBoxes.forEach(function(chkb, index) {
		cartCodeArr[index] = chkb.value;
	});
	console.log(cartCodeArr);
	location.href = `/cart/deleteCarts?cartCodes=${cartCodeArr}`;
}

//상품 구매
function regBuy() {
	//체크된 체크박스들 가져오기
	const checkedBoxes = document.querySelectorAll('.chk:checked')

	//db저장된 가격정보와 화면가격정보가 일치하는지 확인
	for (const checkedBox of checkedBoxes) {
		let DbCartItemTotalPrice = checkedBox.closest('.cart_list_info').querySelector('input.sumPrice').value;
		let oneCartItemTotalPrice = checkedBox.closest('.cart_list_info').querySelector('#sumPrice').textContent.replace(/[^0-9.-]+/g, "");
		if (DbCartItemTotalPrice != oneCartItemTotalPrice) {
			swal.fire({
				title: '선택한 상품들의 항목의\n수정버튼을 클릭하여 주세요',
				icon: 'warning',
				button: '확인'
			})
			return;
		}
	}

	//구매 정보 등록
	//구매 정보 객체 생성
	let buyVO = {
		buy_price: 0,
		buy_detail_list: []
	}
	//총 구매 가격 데이터 가져오기
	buyVO.buy_price = setFinalPrice();

	//구매 상세 정보 데이터 가져오기
	checkedBoxes.forEach(function(chkb, index) {
		//한 상품마다 객체 생성후 데이터 가져오기
		let buyDetailVO = {
			item_code: chkb.getAttribute('data-itemCode'),
			buy_cnt: chkb.getAttribute('data-cartCnt'),
			detail_buy_price: chkb.getAttribute('data-detailBuyPrice'),
		}
		buyVO.buy_detail_list[index] = buyDetailVO;
	});
	
	console.log(buyVO);
	/*
	//선생님 버전
	
	//넘길 데이터
	const detail_info_arr = []
	for (let i = 0; i < checkedBoxes.length; i++) {

		buy_detail_info = {
			'item_code': checkedBoxes[i].dataset.itemcode,
			'buy_cnt': checkedBoxes[i].dataset.cartcnt,
			'detail_but_price': checkedBoxes[i].dataset.detailbuyprice
		};
		
		detail_info_arr[i] = buy_detail_info;
 	}
 	
 	//총 구매 금액
 	let final_price = document.querySelector('#sumPrice').textContent;
 	//숫자만 추출하는 정규식
 	const regex = /[^0-9]/g;
 	final_price = final_price.replace(regex, '');
 	
 	data = {
		'final_price': final_price,
		'detail_info_arr': detail_info_arr
	}
	*/
	
	$.ajax({
		type: "POST",
		url: "/buy/regBuy2Ajax",
		data: JSON.stringify(buyVO),
		contentType: "application/json; charset=UTF-8",
		success: function(response) {
			swal.fire({
				title: '구매 완료',
				text: '구매해주셔서 감사합니다',
				icon: 'success',
				button: '확인'
			})
				.then((result) => {
					//cartCode를 여러개 담을 수 있는 배열 생성
					const cartCodeArr = [];
					checkedBoxes.forEach(function(chkb, index) {
						cartCodeArr[index] = chkb.value;
					});
					console.log(cartCodeArr);
					location.href = `/cart/deleteCarts?cartCodes=${cartCodeArr}`
				})
		},
		error: function() {
			alert('통신실패');
		}
	});
	
}


//체크 박스 선택에 따른 전체선택 박스 체크 또는 해제 
function checkBox() {

	//2-1. 내용부에 있는 체크박스들 선택
	const checkboxes = document.querySelectorAll('.chk');

	// 초기화할 때도 화면에 출력
	//orderTotalPrice.textContent = '';

	//체크가 된 체크박스의 개수
	const checkedCnt = document.querySelectorAll('.chk:checked').length;
	const totalCnt = checkboxes.length;

	if (totalCnt == checkedCnt) {
		document.querySelector('#allChk').checked = true;
	}
	else {
		document.querySelector('#allChk').checked = false;
	}

	//총 가격 정보 수정
	setFinalPrice();
}

// 총 구매 금액 변경
function setFinalPrice() {
	const checkboxes = document.querySelectorAll('.chk:checked');

	let orderTotalPrice = 0;

	for (const checkbox of checkboxes) {
		// 총 가격 정보 가져오기
		let oneItemSumPrice = parseInt(checkbox.closest('.cart_list_info').querySelector('#sumPrice').textContent.replace(/[^0-9.-]+/g, ""));
		// 체크가 되있는 경우에만 값 합산
		orderTotalPrice += oneItemSumPrice;
	}
	document.querySelector('#orderTotalPrice').textContent = orderTotalPrice.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });

	//총 가격 데이터 리턴
	return orderTotalPrice;
}


//------------------------------- 이벤트 -------------------------//

//이벤트
//1. 체크박스 전체 선택, 전체 해제 이벤트
//1-1. 제목줄에 있는 체크박스를 선택
const allCheck = document.querySelector('#allChk');

//1-2. 체크박스에 클릭 시 실행되는 이벤트 추가
allCheck.addEventListener('click', function() {
	//제목 줄 체크박스의 체크 여부
	const isChecked = allCheck.checked;

	//체크 됐을때
	if (isChecked) {
		//카테고리 목록에 있는 모든 체크박스를 선택
		const checkboxes = document.querySelectorAll('.chk');

		//체크 박스에 체크속성주기
		//예시 checkbox.checked = true;

		//가져온 체크박스의 개수만큼 반복.
		for (let i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = true;
		}
	}
	//체크 해제 됐을때 
	else {
		//장바구니 목록에 있는 모든 체크박스를 선택
		const checkboxes = document.querySelectorAll('.chk');
		//가져온 체크박스의 개수만큼 반복.
		for (const checkbox of checkboxes) {
			checkbox.checked = false;
		}
	}
	// 총 가격 정보 수정
	setFinalPrice();
});


/*
ajax json
$.ajax({
		 type: "POST",
		 url: "",
		 data: JSON.stringify(),
		 dataType: "json",
		 contentType: "application/json; charset=UTF-8",
		 success: function (response) {
			console.log(response);
		 }
})


1. 체크박스 전체 선택, 전체 해제 이벤트
const allCheck = document.querySelector('#allChk');
const sumPrices = document.querySelectorAll('.sumPrice');

allCheck.addEventListener('click', updateOrderTotalPrice);

// 2. 내용부의 체크박스에 따라 제목줄 체크박스 체크 여부 변경
const checkboxes = document.querySelectorAll('.chk');
checkboxes.forEach(checkbox => checkbox.addEventListener('click', updateOrderTotalPrice));

// 체크박스 상태에 따라 주문 금액을 업데이트하는 함수
function updateOrderTotalPrice() {
  let orderTotalPrice = 0;

  checkboxes.forEach((checkbox, index) => {
	if (checkbox.checked) {
	  orderTotalPrice += parseInt(sumPrices[index].value);
	}
  });

  document.querySelector('#orderTotalPrice').textContent = orderTotalPrice.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });

  const checkedCnt = document.querySelectorAll('.chk:checked').length;
  const totalCnt = checkboxes.length;

  if (totalCnt === checkedCnt) {
	allCheck.checked = true;
  } else {
	allCheck.checked = false;
  }
}

// 초기 체크박스 상태 설정
document.addEventListener('DOMContentLoaded', () => {
  allCheck.checked = true;
  checkboxes.forEach(checkbox => checkbox.checked = true);
  updateOrderTotalPrice();
}); 
*/