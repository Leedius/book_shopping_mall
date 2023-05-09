
//권한 변경
function roleChange(memId, sel_tag){
	const sel_role = sel_tag.value;
	//ajax start
	$.ajax({
		url: '/admin/memRoleUpdateAjax', //요청경로
		type: 'post',
		async: true, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'memId':memId, 'memRole':sel_role},			//JSON.stringify(classInfo), //필요한 데이터
		//contentType: 'application/json; charset=UTF-8',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			swal.fire({
				title:'권한이 변경되었습니다',
				icon:'success',
				button:'확인'
			})
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}