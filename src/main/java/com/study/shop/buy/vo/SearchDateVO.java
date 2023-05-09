package com.study.shop.buy.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class SearchDateVO {
	private String fromDate;
	private String toDate;
	private int month;
}
