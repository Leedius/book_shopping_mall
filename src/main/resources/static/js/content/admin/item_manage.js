
//검색 기능
function searchItem() {
	
	//폼 태그 선택
	const searchForm = document.querySelector('#searchForm');
	
	//카테고리 체크확인(하나라도 체크가 되있어야 함)
	//1.체크가 몇개 되었는지 확인
	const checkedCnt = document.querySelectorAll('.chk:checked').length;
	
	//2.체크가 하나도 안되었을 때 경고창
	if(checkedCnt == 0) {
		alert('카테고리가 선택되지 않았습니다.')
		return false;
	}
	
	//재고량 숫자만 입력하게 하기
	
	searchForm.submit();
}

//상품 상태에 따른 상품 목록 조회
function itemStatusChange(selectStatus) {
	let selectStatusValue = selectStatus.value;
	console.log(selectStatusValue);
	$.ajax({
		url: '/admin/selectStatusItemAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'itemStatus': selectStatusValue }, //필요한 데이터
		success: function(result) {
			if (result) {
				const tbodyTag = document.querySelector('#itemList tbody');

				tbodyTag.replaceChildren();

				let str = '';

				for (let i = 0; i < result.length; i++) {
					str += '<tr>'
					str += `<td>${i + 1}</td>`;
					str += `<td>${result[i].categoryVO.cateName}</td>`;
					str += `<td>${result[i].itemName}</td>`;
					str += `<td>${result[i].itemStatusName}</td>`;
					str += `<td>${result[i].itemStock}</td>`;
					str += '<tr>';
				}
				tbodyTag.insertAdjacentHTML("afterbegin", str);
			}
			else {
			}
		},
		error: function() {
			alert('실패');
		}
	})
}

//이미지 팝업 모달
const imgModal = new bootstrap.Modal('#imgModal');

//이미지명 클릭 시 이미지 모달창 띄움
function openImgModal(attachedFileName, originFileName) {
	//모달 안에서 보여질 이미지 정보 세팅
	//이미지 위치 정보 저장
	const modalTag = document.querySelector('#imgModal');
	modalTag.querySelector('img').src = `/upload/images/item/${attachedFileName}`;

	//이미지 이름 정보 저장
	let index = originFileName.indexOf('.');
	modalTag.querySelector('h1').textContent = originFileName.slice(0, index);;

	imgModal.show();
	//imgModal.hide() -> 모달 숨김
}


//상품명을 클릭하면 수정부분에 정보 띄우기
function updateFormAjax(itemCode) {
	$.ajax({
		url: '/admin/getItemDetailAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'itemCode': itemCode }, //필요한 데이터
		success: function(result) {
			if (result) {
				console.log(result);
				console.log(result['item']);

				//값을 지우고 채울 태그 가져오기
				const tableTag = document.querySelector('#itemInfo');

				//들고온 값으로 설정할 select 박스의 값
				const itemStatus = result.item.itemStatus;
				const cateCode = result.item.cateCode;

				tableTag.replaceChildren();

				let str = '';

				str += `<form action="/admin/updateItemInfo" method="post" id="itemUpdateForm">                                                                            `;
				str += `<input type="hidden" name="itemCode" value=${result['item'].itemCode}>`;
				str += `<table class="table align-middle text-center item_search_table">  `;
				str += `<colgroup>             `;
				str += `	<col width="20%">  `;
				str += `	<col width="*">    `;
				str += `	<col width="10%">  `;
				str += `</colgroup>            `;
				str += `<tbody>`;
				str += `<tr>                                                                              `;
				str += `		<td colspan="2" class="item_list_title sub_title">상 품 기 본 정 보</td>               `;
				str += `		<td rowspan="13" class="" style="padding: 0; position: relative;">                             `;
				str += `			<input class="btn updateBtn" type="submit"                                `;
				str += `				value="수 정" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0;">                              `;
				str += `		</td>                                                                        `;
				str += `	</tr>                                                                            `;
				str += `	<tr>                                                                             `;
				str += `		<td class="item_list_title">카테고리</td>                                    `;
				str += `		<td><select id="category" name="cateCode" class="form-select">               `;
				for (let i = 0; i < result['cateList'].length; i++) {
					;
					str += `					<option value="${result['cateList'][i].cateCode}">${result['cateList'][i].cateName} `;
					if (result['cateList'][i].isUse == 'N') {
						;
						str += `(미사용)`;
					};
					str += `					</option>                                                        `;
				};
				str += `		</select></td>                                                               `;
				str += `	</tr>                                                                            `;
				str += `	<tr>                                                                             `;
				str += `		<td class="item_list_title">상품명</td>                                      `;
				str += `		<td><input type="text" class="form-control" name="itemName"                  `;
				str += `			id="itemName" value="${result['item'].itemName}"></td>                                                      `;
				str += `	</tr>                                                                            `;
				str += `	<tr>                                                                             `;
				str += `		<td class="item_list_title">판매가격</td>                                    `;
				str += `		<td><input type="number" class="form-control" name="itemPrice"               `;
				str += `			id="itemPrice" value=${result['item'].itemPrice}></td>                                                     `;
				str += `	</tr>                                                                            `;
				str += `	<tr>                                                                             `;
				str += `		<td class="item_list_title">상품소개</td>                                    `;
				str += `		<td><textarea cols="3" class="form-control" name="itemIntro"                 `;
				str += `				id="itemIntro">${result['item'].itemIntro}</textarea></td>                                      `;
				str += `	</tr>                                                                            `;
				str += `	<tr>                                                                             `;
				str += `		<td colspan="2" class="item_list_title sub_title">상 품 판 매 정 보</td>                    `;
				str += `		<td class=""></td>                                                           `;
				str += `	</tr>                                                                            `;
				str += `	<tr>                                                                             `;
				str += `		<td class="item_list_title">상품상태</td>                                    `;
				str += `		<td><select id="itemInfoItemStatus" name="itemStatus"                `;
				str += `			class="form-select">                                                     `;
				str += `				<option value="1">판매중</option>                                    `;
				str += `				<option value="2">준비중</option>                                    `;
				str += `				<option value="3">매진</option>                                      `;
				str += `		</select></td>                                                               `;
				str += `	</tr>                                                                            `;
				str += `	<tr>                                                                             `;
				str += `		<td class="item_list_title">재고</td>                                        `;
				str += `		<td><input type="number" class="form-control" name="itemStock" id="itemStock" value=${result['item'].itemStock}></td>                         `;
				str += `	</tr>                                                                            `;
				str += `	<tr>                                                                             `;
				str += `		<td colspan="2" class="item_list_title sub_title">상 품  이 미 지  정 보</td>                `;
				str += `	</tr>                                                                            `;
				str += `	<tr>                                                                             `;
				str += `		<td rowspan="2" class="item_list_title">메인 이미지</td>                                 `;
				str += `		<td><input type="file" class="form-control" id="mainImg"                     `;
				str += `			name="mainImg" ></td>                                                    `;
				str += `	</tr>								`;
				str += `	<tr>								`;
				str += `		<td>								`;
				for (const img of result['item'].imgList) {
					if (img.isMain == 'Y') {
						str += `					<label class="form-label"><a href="javascript:void(0);" onclick="openImgModal('${img.attachedFileName}', '${img.originFileName}');">${img.originFileName}</a></label>                        `;
					}
				}
				str += `		</td>								`;
				str += `	</tr>								`;
				str += `	<tr>                                                                             `;
				str += `		<td rowspan="2" class="item_list_title">서브 이미지</td>                                 `;
				str += `		<td><input type="file" class="form-control" id="subImg"                      `;
				str += `			name="subImg"></td>                                                      `;
				str += `	</tr>																			 `;
				str += `	<tr>								`;
				str += `		<td>						`;
				for (const img of result['item'].imgList) {
					if (img.isMain == 'N') {
						str += `					<label class="form-label"><a href="javascript:void(0);" onclick="openImgModal('${img.attachedFileName}', '${img.originFileName}');">${img.originFileName}</a></label>                        `;
					}
				}
				str += `		</td>								`;
				str += `	</tr>								`;
				str += `</tbody>`;
				str += `</table>`;
				str += `</form>                                                                              `;

				tableTag.insertAdjacentHTML("afterbegin", str);

				//선택된 상품의 카테고리 select값으로 선택되게 하기                                                                                          
				const itemCategorySelect = document.querySelector('#category');

				const optionToSelectCategory = itemCategorySelect.querySelector(`option[value="${cateCode}"]`);

				itemCategorySelect.value = optionToSelectCategory.value;

				//선택된 상품의 상태 select값으로 선택되게 하기                                                                                              
				const itemStatusSelect = document.querySelector('#itemInfoItemStatus');

				const optionToSelectItemStatus = itemStatusSelect.querySelector(`option[value="${itemStatus}"]`);

				itemStatusSelect.value = optionToSelectItemStatus.value;

			}
			else {
			}
		},
		error: function() {
			alert('실패');
		}
	})
}

//상품명을 클릭하면 수정부분에 정보 띄우기 (선생님 버전)
function updateForm(itemCode) {
	$.ajax({
		url: '/admin/getItemDetailAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'itemCode': itemCode }, //필요한 데이터
		success: function(result) {
			const itemInfo = document.querySelector('#itemInfo');

			console.log(result);
			console.log(result['item']);

			itemInfo.replaceChildren();

			let str = '';

			str += `<form action="/admin/updateItemInfo" method="post">                                                                              `;
			str += `<input type="hidden" name="itemCode" value=${result['item'].itemCode}>`;
			str += `	<div class="row">                                                               `;
			str += `		<div class="col-9 sub-title">                                               `;
			str += `			상품 기본 정보                                                          `;
			str += `		</div>                                                                      `;
			str += `		<div class="col-3 sub-title d-grid">                                        `;
			str += `			<button type="submit" class="btn">                          `;
			str += `				수 정                                                               `;
			str += `			</button>                                                               `;
			str += `		</div>                                                                      `;
			str += `	</div>                                                                          `;
			str += `	<div class="row">                                                               `;
			str += `		<div class="col-1"></div>                                                   `;
			str += `		<div class="col-11">                                                        `;
			str += `			<div class="row update-content">                                        `;
			str += `				<label class="col-3 col-form-label text-end">카테고리</label>       `;
			str += `				<div class="col-9">                                                 `;
			str += `					<select id="cateCode" name="cateCode" class="form-select">                      `;

			for (const e of result['cateList']) {
				const selected = result['item'].cateCode == e.cateCode ? 'selected' : '';
				str += `<option value="${e.cateCode}" ${selected}>${e.cateName}</option>`
			}

			str += `					</select>                                                       `;
			str += `				</div>                                                              `;
			str += `				<label class="col-3 col-form-label text-end">상품명</label>         `;
			str += `				<div class="col-9">                                                 `;
			str += `					<input type="text" class="form-control" value='${result['item'].itemName}' id="itemName" name="itemName">                        `;
			str += `				</div>                                                              `;
			str += `				<label class="col-3 col-form-label text-end">판매가격</label>       `;
			str += `				<div class="col-9">                                                 `;
			str += `					<input type="text" class="form-control" value=${result['item'].itemPrice} id="itemPrice" name="itemPrice">                        `;
			str += `				</div>                                                              `;
			str += `				<label class="col-3 col-form-label text-end">상품소개</label>       `;
			str += `				<div class="col-9">                                                 `;
			str += `					<textarea class="form-control" rows="3" id="itemIntro" name="itemIntro">${result['item'].itemIntro}</textarea>             `;
			str += `				</div>                                                              `;
			str += `			</div>                                                                  `;
			str += `		</div>                                                                      `;
			str += `	</div>                                                                          `;
			str += `	<div class="row">                                                               `;
			str += `		<div class="col-9 sub-title">                                               `;
			str += `			상품 판매 정보                                                          `;
			str += `		</div>                                                                      `;
			str += `	</div>                                                                          `;
			str += `	<div class="row">                                                               `;
			str += `		<div class="col-1"></div>                                                   `;
			str += `		<div class="col-11">                                                        `;
			str += `			<div class="row update-content">                                        `;
			str += `				<label class="col-3 col-form-label text-end">상품상태</label>       `;
			str += `				<div class="col-9">                                                 `;
			str += `					<select id="itemStatus" name="itemStatus" class="form-select">                      `;

			if (result['item'].itemStatus == 1) {
				str += `						<option value="1" selected>판매중</option>                              `;
				str += `						<option value="2">준비중</option>                              `;
				str += `						<option value="3">매진</option>                              `;
			}
			else if (result['item'].itemStatus == 2) {
				str += `						<option value="1">판매중</option>                              `;
				str += `						<option value="2" selected>준비중</option>                              `;
				str += `						<option value="3">매진</option>                              `;
			}
			else if (result['item'].itemStatus == 3) {
				str += `						<option value="1">판매중</option>                              `;
				str += `						<option value="2">준비중</option>                              `;
				str += `						<option value="3" selected>매진</option>                              `;
			}

			str += `					</select>                                                       `;
			str += `				</div>                                                              `;
			str += `				<label class="col-3 col-form-label text-end">재 고</label>          `;
			str += `				<div class="col-9">                                                 `;
			str += `					<input type="text" class="form-control" value="${result['item'].itemStock}" id="itemStock" name="itemStock">                        `;
			str += `				</div>                                                              `;
			str += `			</div>                                                                  `;
			str += `		</div>                                                                      `;
			str += `	</div>                                                                          `;
			str += `	<div class="row">                                                               `;
			str += `		<div class="col sub-title">                                                 `;
			str += `			상품 이미지 정보                                                        `;
			str += `		</div>                                                                      `;
			str += `	</div>                                                                          `;
			str += `	<div class="row">                                                               `;
			str += `		<div class="col-1"></div>                                                   `;
			str += `		<div class="col-11">                                                        `;
			str += `			<div class="row update-content">                                        `;
			str += `				<label class="col-3 col-form-label text-end">메인 이미지</label>    `;
			str += `				<div class="col-9">                                                 `;
			str += `					<input type="file" class="form-control">                        `;
			str += `				</div>                                                              `;
			str += `				<label class="col-3 col-form-label text-end"></label>    `;
			str += `				<div class="col-9">                                                 `;
			for (const img of result['item'].imgList) {
				if (img.isMain == 'Y') {
					str += `					<label class="form-label"><a href="javascript:void(0);" onclick="openImgModal('${img.attachedFileName}', );">${img.originFileName}</a></label>                        `;
				}
			}
			str += `				</div>                                                              `;
			str += `				<label class="col-3 col-form-label text-end">상세 이미지</label>    `;
			str += `				<div class="col-9">                                                 `;
			str += `					<input type="file" class="form-control">                        `;
			str += `				</div>                                                              `;
			str += `				<label class="col-3 col-form-label text-end"></label>    `;
			str += `				<div class="col-9">                                                 `;
			for (const img of result['item'].imgList) {
				if (img.isMain == 'N') {
					str += `					<label class="form-label"><a href="javascript:void(0);" onclick="openImgModal('${img.attachedFileName}');">${img.originFileName}</a></label>                        `;
				}
			}
			str += `				</div>                                                              `;
			str += `			</div>                                                                  `;
			str += `		</div>                                                                      `;
			str += `	</div>                                                                          `;
			str += `</form>                                                                             `;


			itemInfo.insertAdjacentHTML("afterbegin", str);


		},
		error: function() {
			alert('실패');
		}
	})
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
		for (const checkbox of checkboxes) {
			checkbox.checked = true;
		}
	}
	//체크 해제 됐을때 
	else {
		//카테고리 목록에 있는 모든 체크박스를 선택
		const checkboxes = document.querySelectorAll('.chk');
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