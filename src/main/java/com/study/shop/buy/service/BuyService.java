package com.study.shop.buy.service;

import java.util.List;

import com.study.shop.buy.vo.BuyVO;

public interface BuyService {
	//구매 코드 조회
	String getNextBuyCode();
	
	//장바구니 상품 구매
	void regBuyCart(BuyVO buyVO);
	
	//구매 내역 조회
	List<BuyVO> getPurchaseList(BuyVO buyVO);
	
}
