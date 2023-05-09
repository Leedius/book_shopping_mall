package com.study.shop.item.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ImgVO {
	private String imgCode;
	private String originFileName;
	private String attachedFileName;
	private String isMain;
	private String itemCode;
}
