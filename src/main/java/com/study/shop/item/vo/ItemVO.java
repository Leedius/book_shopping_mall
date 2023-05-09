package com.study.shop.item.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ItemVO {
	private String itemCode;
	private String cateCode;
	private String itemName;
	private int itemPrice;
	private int itemStock;
	private String itemIntro;
	private int itemStatus;
	private String itemStatusName;
	private List<ImgVO> imgList;
	private CategoryVO categoryVO;
	private SearchVO searchVO;
}
