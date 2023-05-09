package com.study.shop.buy.vo;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.study.shop.admin.vo.OrderStatusVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class BuyVO extends SearchDateVO{
	@JsonProperty("buy_code")
	private String buyCode;
	@JsonProperty("mem_id")
	private String memId;
	@JsonProperty("buy_price")
	private int buyPrice;
	@JsonProperty("buy_date")
	private String buyDate;
	@JsonProperty("buy_detail_list")
	private List<BuyDetailVO> buyDetailList;
	private int etc;
	
}
