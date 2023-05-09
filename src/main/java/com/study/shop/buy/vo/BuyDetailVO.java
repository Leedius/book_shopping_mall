package com.study.shop.buy.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.study.shop.item.vo.CategoryVO;
import com.study.shop.item.vo.ItemVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class BuyDetailVO {
	@JsonProperty("buy_detail_code")
	private String buyDetailCode;
	@JsonProperty("item_code")
	private String itemCode;
	@JsonProperty("buy_cnt")
	private int buyCnt;
	@JsonProperty("detail_buy_price")
	private int detailBuyPrice;
	@JsonProperty("buy_code")
	private String buyCode;
	private ItemVO itemVO;
	
	private CategoryVO categoryVO;
}
