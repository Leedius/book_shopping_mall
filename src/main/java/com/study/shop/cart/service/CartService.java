package com.study.shop.cart.service;

import java.util.List;

import com.study.shop.cart.vo.CartVO;
import com.study.shop.view.CartViewVO;

public interface CartService {
	//카트 목록 조회
	List<CartVO> getCartList(CartVO cartVO); 
	
	//상품 카트 등록
	void regCartAjax(CartVO cartVO);
	
	//상품 수량 수정
	void updateCart(CartVO cartVO);
	
	//카트 상품 삭제
	void delCartItem(CartVO cartVO);
	
	//카트 상품 선택 삭제
	void deleteCarts(CartVO cartVO);
}
