
function activeLink(link) {
	// 모든 a 태그에서 'active' 클래스를 제거합니다.
	const allLinks = document.querySelectorAll('.list-group-item');
	allLinks.forEach((item) => item.classList.remove('active'));

	// 선택한 링크에 'active' 클래스를 추가합니다.
	link.classList.add('active');
}





