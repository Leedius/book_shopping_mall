//contentType : 서버단으로 넘기는 데이터의 타입 지정
//default : application/x-www-form-urlencoded; charset=UTF-8
//많이 사용하는 타입 : application/json; charset=UTF-8


//default 방식
function test1() {
	//ajax start
	$.ajax({
		url: '/test/test1', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: {
			'name': 'java'
			, 'age': 20
			, 'addr': '울산시'
		}, //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}

//json 방식 커맨드 객체로 데이터 받기
function test2() {
	//ajax start

	const data = {
		'name': 'java'
		, 'age': 20
		, 'addr': '울산시'
	}

	$.ajax({
		url: '/test/test2', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: JSON.stringify(data), //필요한 데이터
		contentType: 'application/json; charset=UTF-8',
		success: function(result) {

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}

//json 방식 map으로 데이터 받기
function test3() {
	//ajax start

	const data = {
		'name': 'java'
		, 'age': 20
		, 'addr': '울산시'
	}

	$.ajax({
		url: '/test/test3', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: JSON.stringify(data), //필요한 데이터
		contentType: 'application/json; charset=UTF-8',
		success: function(result) {

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}

//json 방식 커맨드 객체로 배열을 넘기기
function test4() {
	//ajax start
	dataArr = []

	for (let i = 0; i < 3; i++) {
		data = {
			'name': 'java' + i
			, 'age': 20 + i
			, 'addr': '울산시' + i
		}
		dataArr[i] = data;
	}

	$.ajax({
		url: '/test/test4', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: JSON.stringify(dataArr), //필요한 데이터
		contentType: 'application/json; charset=UTF-8',
		success: function(result) {
			alert('성공');
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}


//일반 형식으로 배열 데이터 받기
function test5() {
	//ajax start
	dataArr = []

	for (let i = 0; i < 3; i++) {
		data = {
			'name': 'java' + i
			, 'age': 20 + i
			, 'addr': '울산시' + i
		}
		dataArr[i] = data;
	}

	$.ajax({
		url: '/test/test5', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: {'dataArr': dataArr}, //필요한 데이터
		//contentType: 'application/json; charset=UTF-8',
		success: function(result) {
			alert('성공');
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}


//json 방식 객체 배열 데이터 map으로 데이터 받기
function test6() {
	//ajax start
	dataArr = []

	for (let i = 0; i < 3; i++) {
		let data = {
			'name': 'java' + i
			, 'age': 20 + i
			, 'addr': '울산시' + i
		}
		dataArr[i] = data;
	}

	$.ajax({
		url: '/test/test6', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: JSON.stringify(dataArr), //필요한 데이터
		contentType: 'application/json; charset=UTF-8',
		success: function(result) {
			alert('성공');
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}

//
function test7() {
	//ajax start
	//학생 3명 데이터 + 반정보
	//반정보
	// 학생정보 : {
	//		학생명
	//		, 나이
	//		, 점수
	//	}
	// , 선생님 이름 : 
	// , 반이름 :
	
	classVO = {
		tea_name : '홍길동'
		, class_name : '자바반'
		, stu_list : []
	};
	
	for (let i = 0; i < 3; i++) {
		let student = {
			'name': 'java' + i
			, 'age': 20 + i
			, 'score':50 + i
		};
		classVO.stu_list[i] = student;
	};
	
	console.log(classVO)

	$.ajax({
		url: '/test/test7', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: JSON.stringify(classVO), //필요한 데이터
		contentType: 'application/json; charset=UTF-8',
		success: function(result) {
			alert('성공');
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}

//
function test8() {
	//ajax start
	//학생 3명 데이터 + 반정보
	//반정보
	// 학생정보 : {
	//		학생명
	//		, 나이
	//		, 점수
	//	}
	// , 선생님 이름 : 
	// , 반이름 :
	
	stuList = []

	for (let i = 0; i < 3; i++) {
	 	let student = {
			'name': 'java' + i
			, 'age': 20 + i
			, 'score':50 + i
		};
		stuList[i] = student;
	};
	
	classInfo = {
		'tea_name' : '홍길동'
		, 'class_name' : '자바반'
		, 'stu_list' : stuList
	};

	$.ajax({
		url: '/test/test8', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/json; charset=UTF-8',
		success: function(result) {
			alert('성공');
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 	
}

	