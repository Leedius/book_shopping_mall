package com.study.shop.buy.service;


import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.shop.buy.vo.BuyVO;

@Service("buyService")
public class BuyServiceImpl implements BuyService {
	@Autowired
	private SqlSessionTemplate sqlsession;

	//구매 코드 조회
	@Override
	public String getNextBuyCode() {
		return sqlsession.selectOne("buyMapper.getNextBuyCode"); 
	}

	//장바구니 상품 구매
	@Transactional(rollbackFor = Exception.class)
	@Override
	public void regBuyCart(BuyVO buyVO) {
		//구매 정보 등록
		sqlsession.insert("buyMapper.regBuy", buyVO);
		//구매 상세 정보 등록
		sqlsession.insert("buyMapper.regBuyDetail", buyVO);
		//주문 상태 정보 등록
		sqlsession.insert("buyMapper.regOrderStatus", buyVO);
	}


	//구매 내역 조회
	@Override
	public List<BuyVO> getPurchaseList(BuyVO buyVO) {
		return sqlsession.selectList("buyMapper.purchaseList", buyVO);
	}

}
