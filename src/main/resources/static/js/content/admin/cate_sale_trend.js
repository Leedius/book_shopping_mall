


//카테고리별 판매 추이 차트
getCateChartDataAjax();

//카테고리별 판매 추이 차트
//차트를 그릴 데이터를 가져오는 함수

function getCateChartDataAjax() {

	//ajax start
	$.ajax({
		url: '/admin/saleStatusByCategoryAjax', //요청경로
		type: 'post',
		async: true, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {},			//JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			drawTable(result);
			drawCateChart(result);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

//테이블을 그리는 함수
function drawTable(result) {
	//테이블이 그려질 div태그 선택
	const tableDiv = document.querySelector('.table_div');
	console.log(result);
	//그려질 테이블이 작성될 문자열
	let str = ``;

	str += `<table class="table text-center">`;
	str += `<thead style="background-color:#b7ffe9">`;
	str += `<tr>`;
	str += `<td>No</td>`;
	str += `<td>카테고리명</td>`;
	str += `<td>누적 판매수</td>`;
	str += `</tr>`;
	str += `</thead>`;
	str += `<tbody>`;
	for(let i = 0 ; i < result.length ; i++){
	str += `<tr>`;
	str += `<td>${result.length - i}</td>`;
	str += `<td>${result[i]['CATE_NAME']}</td>`;
	str += `<td>${result[i]['BUYCNT']} 개</td>`;
	str += `</tr>`;
	}
	str += `</tbody>`;
	str += `</table>`;

	//테이블이 들어갈 div에 태그에 위에서 만든 코드 삽입
	tableDiv.insertAdjacentHTML('afterbegin', str);
}

function drawCateChart(result) {
	//resultJson = JSON.parse(result);	//제이슨 형식 변환
	const DATA_COUNT = 3;
	
	//추출한 데이터 배열로 변환(result.map(data => data.CATE_NAME) 이방법 쓰면 쓸필요 없음)
	const cateNameArr = [];
	const buyCntArr = [];
	
	result.forEach(function(item, index){
		cateNameArr[index] = item['CATE_NAME'];
		buyCntArr[index] = item['BUYCNT']; 	
	});

	let data = {
		//labels: resultJson.map(data => data.CATE_NAME), //제이슨 형식
		labels: result.map(data => data.CATE_NAME),
		datasets: [
			{
				label: '판매수',
				data: result.map(data => data.BUYCNT),
				backgroundColor: ['#afdaf7', 'yellow', '#b7e6e6'],
			}
		]
	};


	const canvas = document.getElementById('pieChart');
	const pieChart = new Chart(canvas, {
		type: 'pie',
		data: data,
		options: {
			//차트 크기 변경
			responsive: true,
			legend: {
			},
			plugins: {
				legend: {
					position: 'top',
					labels: {
						font: {
							size: 18
						}
					}
				},
				title: {
					display: true,
					text: '카테고리별 판매 추이',
					font: {
						size: 28,
						color: 'blue'
					}
				},
				datalabels: {
					formatter: function(value, context) {
						return context.chart.data.labels[context.dataIndex] + '\n' + Math.round(value / context.chart.getDatasetMeta(0).total * 100) + "%";
					},
					font: {
						weight: 'normal',
						size: '20'
					},
					textAlign: 'center'
				},
			},
		},
		plugins: [ChartDataLabels]
	});
};







