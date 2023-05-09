package com.study.shop.admin.vo;

import com.study.shop.buy.vo.BuyVO;
import com.study.shop.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderStatusVO {
	private int orderNum;
	private int statusCode;
	private String buyCode;
	private String memId;
	private String updateDate;
	private int rowNum;
	private int rowNumber;
	private MemberVO memberVO;
	private BuyVO buyVO;
	private StatusInfoVO statusInfoVO;
}
