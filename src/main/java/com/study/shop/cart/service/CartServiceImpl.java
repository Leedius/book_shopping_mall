package com.study.shop.cart.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.shop.cart.vo.CartVO;
import com.study.shop.view.CartViewVO;

@Service("cartService")
public class CartServiceImpl implements CartService {
	@Autowired
	private SqlSessionTemplate sqlSession;

	//상품 카트 등록
	@Override
	public void regCartAjax(CartVO cartVO) {
		sqlSession.insert("cartMapper.regCart", cartVO);
	}

	//카트 목록 조회
	@Override
	public List<CartVO> getCartList(CartVO cartVO) {
		return sqlSession.selectList("cartMapper.getCartList", cartVO);
	}

	//카트 상품 수량 수정
	@Override
	public void updateCart(CartVO cartVO) {
		sqlSession.update("cartMapper.updateCart", cartVO);
	}

	//카트 상품 삭제
	@Override
	public void delCartItem(CartVO cartVO) {
		sqlSession.delete("cartMapper.delCartItem", cartVO);
	}

	//카트 상품 선택 삭제
	@Override
	public void deleteCarts(CartVO cartVO) {
		sqlSession.delete("cartMapper.deleteCarts", cartVO);
	}
}
