package com.study.shop.item.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CategoryVO {
	private String cateCode;
	private String cateName;
	private int orderNum;
	private String isUse;
}
