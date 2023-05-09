package com.study.shop.item.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


//이 검색 기능을 사용하는 방법
//1.ItemVO에 SearchVO를 상속시키기(extends)

@Setter
@Getter
@ToString
public class SearchVO {
	private String searchItemCode;
	private String searchItemName;
	private String[] searchCateCode;
	private int searchItemStatus;
	private String searchMinItemStock;
	private String searchMaxItemStock;
}
