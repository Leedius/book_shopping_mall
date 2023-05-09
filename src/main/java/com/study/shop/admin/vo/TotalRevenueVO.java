package com.study.shop.admin.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class TotalRevenueVO {
	private int year;
	private int month;
	private int revenue;
	private int buyCnt;
	private int buyDetailCnt;

}
