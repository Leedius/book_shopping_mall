
//상품 총 가격
function sumPrice(itemPrice, inputElement, itemStock) {

	//구매 수량
	let purchaseQuantity = document.querySelector('#purchaseQuantity').value;

	//총 가격	
	let sumPrice = itemPrice * purchaseQuantity;

	// -가 입력되었을 때와 숫자가아닌 다른게 입력 되었을 때 1로 초기화
	if (parseInt(inputElement.value) < 1) {
		inputElement.value = 1;
	}
	if (parseInt(inputElement.value) > itemStock) {
		inputElement.value = itemStock;
	}
	if (inputElement.value.match(/[0-9]/g) == null) {
		inputElement.value = 1;
	}

	document.querySelector('#sumPrice').value = sumPrice;
	document.querySelector('#sumPrice').textContent = sumPrice.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })
}

//카트 등록시 로그인 체크
function regCart(memId, itemCode) {
	if (memId == '') {
		const result = confirm('먼저 로그인 해야합니다\n로그인 하시겠습니까?');
		if (result) {
			//로그인 모달창 띄움
			const loginModal = new bootstrap.Modal('#loginModal').show();
		}
		return;
	}

	regCartAjax(itemCode);
}

function regCartAjax(itemCode) {
	const purchaseQuantity = document.querySelector('#purchaseQuantity').value;

	//ajax start
	$.ajax({
		url: '/cart/regCartAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'itemCode': itemCode, 'cartCnt': purchaseQuantity }, //필요한 데이터
		success: function(result) {
			const result1 = confirm('장바구니에 상품을 추가했습니다.\n장바구니 목록 페이지로 가시겠습니까?')
			if (result1) {
				location.href = '/cart/cartList';
			}

			swal.fire({
				title: "카트 등록을 완료 했어요!",
				icon: "success",
				button: "확인",
			});
		},
		error: function() {
			swal.fire({
				title: "카트 등록을 실패 했어요!",
				icon: "error",
				button: "확인",
			});
		}
	});
	//ajax end 	
}


//바로구매
function regBuy() {
	swal.fire({
		title: "선택한 상품을 구매하시겠습니까?",
		icon: 'success',

		showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
		confirmButtonText: '구매', // confirm 버튼 텍스트 지정
		cancelButtonText: '취소', // cancel 버튼 텍스트 지정
	})
		.then((result) => {
			if (result.isConfirmed) {
				//구매 객체 생성
				let buyVO = {
					buy_price: 0,
					buy_detail_list: []
				}
				//총 구매 가격 데이터 가져오기
				const totalPrice = document.querySelector('#sumPrice');

				buyVO.buy_price = totalPrice.value;

				//구매 상세 정보 데이터 가져오기
				const buyDetailVO = {
					item_code: totalPrice.dataset.itemcode,
					buy_cnt: document.querySelector('#purchaseQuantity').value,
					detail_buy_price: totalPrice.value,
				};
				buyVO.buy_detail_list[0] = buyDetailVO;
				
				console.log(buyVO);

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
					},
					error: function() {
						alert('통신실패');
					}
				});
			}
		})
}




