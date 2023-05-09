
// 데이터 가져오기
let revenueData = JSON.parse(document.getElementById('revenueData').dataset.revenue);
let revenueData2 = JSON.parse(document.querySelector('#revenueData2').dataset.revenue2);
console.log(revenueData);
console.log(revenueData.map(data => data.revenue));

let monthChart = new Chart(document.getElementById('monthChart'), {
	type: 'bar',
	data: {
		labels: revenueData.map(data => `${data["month"]}월`),
		datasets: [{
			label: '금액',
			data: revenueData.map(data => data.revenue),
			//data: [1,2,3,4,5],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)'
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
			],
			borderWidth: 1,

			yAxisID: 'y'
		},
		{
			label: '건수',
			type: 'line',
			data: revenueData.map(data => data.buyCnt),
			fill: false,
			borderColor: 'rgba(255, 0, 0, 1)',
			borderWidth: 1,
			yAxisID: 'y1', // 오른쪽 y축에 해당하는 ID
			lineTension: 0
		}]
	},
	options: {
		legend: {
			display: false
		},
		scales: {
			y: {
				type: 'linear',
				position: 'left',
				ticks: {
					beginAtZero: true,
					callback: function(value, index, values) {
						return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
					},
				},
				scaleLabel: {
					display: true,
					position: 'left',
					labelString: '(단위 : 원)'
				},
			},

			y1: {

				type: 'linear',
				position: 'right',
				ticks: {
					beginAtZero: true,
					callback: function(value, index, values) {
						return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '건';
					},
				},
				scaleLabel: {
					display: true,
					position: 'right',
					labelString: '(단위 : 개)'
				},
				grid: {
					drawOnChartArea: false, // only want the grid lines for one axis to show up
				},
			},
		},
		tooltips: {
			mode: 'index',
			callbacks: {
				label: function(tooltipItem, data) {
					let dataset = data.datasets[tooltipItem.datasetIndex];
					let value = tooltipItem.yLabel;

					if (tooltipItem.datasetIndex === 0) {
						return '금액 ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
					} else {
						return '건수 ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '건';
					}
				}
			}
		}
	}
});

const revenueMonths = revenueData.map(function(item) { return item.month; });
const revenueBuyCnts = revenueData.map(function(item) { return item.buyCnt; });
const revenueAmounts = revenueData.map(function(item) { return item.revenue; });

//테이블 생성
let table = "<table>";
table += "<thead>";
table += "<tr>";
table += "<td></td>";
revenueMonths.forEach(month => {
	table += `<td>${month}월</td>`
})
table += "</tr>";
table += "</thead>";
table += "<tbody>";
table += "<tr>";
table += "<td>판매 건수</td>";
revenueBuyCnts.forEach(buyCnt => {
	table += `<td>${buyCnt}건</td>`;
});
table += "</tr>";
table += "<tr>";
table += "<td>판매 금액</td>";
revenueAmounts.forEach(amount => {
	table += `<td>${amount.toLocaleString()}원</td>`;
});
table += "</tr>";
table += "</tbody></table>";

// HTML 태그 내에 테이블을 삽입한다.
document.getElementById('table').innerHTML = table;

// 연도별 데이터 가져오기
function selectYear() {
	const selectYear = document.querySelector('#selectYear');
	location.href = `/admin/saleStatusPerMonth?year=${selectYear.value}`;
}



// HTML이 뜨자마자 ajax 실행
getChartDataAjax();

// ------ 함수 선언 ----- //
//월별 매출 차트
//차트를 그릴 데이터를 가져오는 함수
function getChartDataAjax() {

	// 년도 데이터 가져오기
	const selectYear = document.querySelector('#selectYear');
	//ajax start
	$.ajax({
		url: '/admin/getChartDataAjax', //요청경로
		type: 'post',
		async: true, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'year': selectYear.value },			//JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			drawChart(result);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

function drawChart(result) {
	const ctx = document.getElementById('myChart');
	console.log(result);

	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['1월', '2월', '3월', '4월', '5월', '6월'
				, '7월', '8월', '9월', '10월', '11월', '12월'],
			datasets: [
				{
					label: '월별 판매 금액',
					data: result['revenue'],
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					borderWidth: 1,
					yAxisID: 'y'
				},
				{
					label: '월별 판매 건수',
					type: 'line',
					borderColor: 'rgba(255, 0, 0, 1)',
					data: result['buyCnt'],
					borderWidth: 2,
					yAxisID: 'y1'
				}
			]
		},
		options: {
			layout: {
			},
			scales: {
				y: {
					display: true,
					type: 'linear',
					position: 'left',
				},

				y1: {
					display: true,
					type: 'linear',
					position: 'right',
					grid: {
						drawOnChartArea: false, // only want the grid lines for one axis to show up
					},
				},
			}
		}
	});
}



