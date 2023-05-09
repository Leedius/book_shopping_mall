package com.study.shop.admin.vo;

import lombok.ToString;

@ToString
public class PageVO {
	private int nowPage;		//현재 선택된 페이지 번호
	private int totalDataCnt; 	//전체 데이터 개수
	private int beginPage;		//화면에 보이는 첫번째 페이지 번호
	private int endPage;		//화면에 보이는 마지막 페이지 번호
	private int displayCnt; 	//한 페이지에 보여지는 게시글 수
	private int displayPageCnt;	//한 번에 보여지는 페이지 수
	private boolean prev;		//'이전' 버튼의 유무
	private boolean next; 		//'다음' 버튼의 유무
	private int offsetCnt;		//건너뛸 개수
	
	public PageVO() {
		nowPage = 1;
		displayCnt = 5;
		displayPageCnt = 5;
	}
	
	//이 메소드가 실행되면 page 처리를 위한 모든 변수 값을 세팅
	public void setPageInfo() {
		//마지막에 보이는 페이지 번호
		endPage = displayPageCnt * (int)Math.ceil(nowPage / (double)displayPageCnt);
		
		//전체 페이지 수
		int totalPageCnt = (int)Math.ceil(totalDataCnt / (double)displayCnt);
		
		//처음에 보이는 페이지 번호
		beginPage = endPage - displayPageCnt + 1;
		
		//마지막 페이지가 토탈페이지수 보다 높을때
		//마지막 페이지 토탈 페이지수로 설정
		if(endPage > totalPageCnt) {
			endPage = totalPageCnt;
		}
		//토탈페이지가 0일때 페이지 1로 설정
		else if(totalPageCnt == 0) {
			endPage = 1;
		}
		
		//현재 페이지가 마지막페이지를 넘어갈때
		//1페이지로 이동(검색 때문)
		if(nowPage > endPage) {
			beginPage = 1;
			nowPage = 1;
		}

		//next 버튼 유무
		next = (endPage < totalPageCnt);
		
		//prev 버튼 유무
		prev = (beginPage == 1) ? false : true; 
		
		//건너뛸 갯수
		offsetCnt = (nowPage-1) * displayCnt;
		
	}

	public int getNowPage() {
		return nowPage;
	}

	public void setNowPage(int nowPage) {
		this.nowPage = nowPage;
	}

	public int getTotalDataCnt() {
		return totalDataCnt;
	}

	public void setTotalDataCnt(int totalDataCnt) {
		this.totalDataCnt = totalDataCnt;
	}

	public int getBeginPage() {
		return beginPage;
	}

	public void setBeginPage(int beginPage) {
		this.beginPage = beginPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public void setEndPage(int endPage) {
		this.endPage = endPage;
	}

	public int getDisplayCnt() {
		return displayCnt;
	}

	public void setDisplayCnt(int displayCnt) {
		this.displayCnt = displayCnt;
	}

	public int getDisplayPageCnt() {
		return displayPageCnt;
	}

	public void setDisplayPageCnt(int displayPageCnt) {
		this.displayPageCnt = displayPageCnt;
	}

	public boolean isPrev() {
		return prev;
	}

	public void setPrev(boolean prev) {
		this.prev = prev;
	}

	public boolean isNext() {
		return next;
	}

	public void setNext(boolean next) {
		this.next = next;
	}

	public int getOffsetCnt() {
		return offsetCnt;
	}

	public void setOffsetCnt(int offsetCnt) {
		this.offsetCnt = offsetCnt;
	}

	
}
