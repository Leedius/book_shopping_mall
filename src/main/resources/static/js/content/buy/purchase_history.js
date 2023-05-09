
//전체 펼치고 숨기기
function toggle_all(tag) {
	//속성값이 변경되어야 하느 모든 태그가 있는 div 태그 선택
	const accodionItems = document.querySelectorAll('.accordion-item');
	//전체 숨기고 펼치기 버튼 태그
	const status = tag.dataset.toggleStatus;

	if (status == 'close') {
		tag.dataset.toggleStatus = 'open';
		tag.value = '전체 숨기기';
		for (const item of accodionItems) {
			item.querySelector('.accordion-button').classList.remove('collapsed');
			item.querySelector('.accordion-collapse').classList.add('show');
			item.querySelector('.accordion-button').setAttribute('aria-expanded', 'true');
		};
	}
	if (status == 'open') {
		tag.dataset.toggleStatus = 'close';
		tag.value = '전체 펼치기';
		for (const item of accodionItems) {
			item.querySelector('.accordion-button').classList.add('collapsed');
			item.querySelector('div[class*="accordion-collapse"]').classList.remove('show');
			item.querySelector('.accordion-button').setAttribute('aria-expanded', 'false');
		};
	}
}


//전체 구매내역 조회
function purchaseList(month) {
	const month_form = document.querySelector('#month-form');
	month_form.querySelector('input').value = month;
	month_form.submit();
}

//날자별 구매내역 조회
function searchPurchaseList(month) {
	if (month == 0) {
		const startDate = document.querySelector('#startDate').value;
		const endDate = document.querySelector('#endDate').value;
		location.href = '/buy/purchaseList?buyDate=' + month + '&SearchDateVO.startDate=' + startDate + '&SearchDateVO.endDate=' + endDate + '&activeMenu=' + 'purchaseHistory';
	}
	else {
		location.href = '/buy/purchaseList?buyDate=' + month + '&activeMenu=' + 'purchaseHistory';
	}
}
