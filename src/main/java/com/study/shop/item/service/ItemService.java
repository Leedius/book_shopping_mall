package com.study.shop.item.service;

import java.util.List;

import com.study.shop.item.vo.CategoryVO;
import com.study.shop.item.vo.ItemVO;

public interface ItemService {
	//사용중인 카테고리 목록 조회
	List<CategoryVO> getCateListInUse();
	
	//상품 목록 조회
	List<ItemVO> getItemList(ItemVO itemVO);
	
	//상품 상세 페이지 이동
	ItemVO getItemDetailPage(ItemVO itemVO);
}
