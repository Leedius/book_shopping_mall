package com.study.shop.cart.vo;

import java.util.List;

import com.study.shop.item.vo.ItemVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CartVO {
	private String cartCode;
	private String itemCode;
	private String memId;
	private String regDate;
	private String cartCnt;
	private int totalPrice;
	private ItemVO itemVO;
	private List<String> cartCodeList;
}
