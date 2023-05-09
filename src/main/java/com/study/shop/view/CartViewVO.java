package com.study.shop.view;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class CartViewVO {
	private String cartCode;
	private String itemCode;
	private String cateCode;
	private String cateName;
	private String itemName;
	private int itemPrice;
	private int itemStock;
	private String itemIntro;
	private int itemStatus;
	private String memId;
	private String regDate;
	private int cartCnt;
	private String imgCode;
	private String originFileName;
	private String attachedFileName;
	private String isMain;
}
