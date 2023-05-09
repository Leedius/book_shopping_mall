package com.study.shop.admin.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchOrderVO {
	private String fromDate;
	private String toDate;
	private int[] searchOrderStatus;
	private String searchKeyword;
	private String searchValue;
	private String searchOrderBy;
}
