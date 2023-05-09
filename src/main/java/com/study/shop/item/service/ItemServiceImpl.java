package com.study.shop.item.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.shop.item.vo.CategoryVO;
import com.study.shop.item.vo.ItemVO;

@Service("itemService")
public class ItemServiceImpl implements ItemService {
	@Autowired
	private SqlSessionTemplate sqlSession;

	//사용중인 카테고리 목록 조회
	@Override
	public List<CategoryVO> getCateListInUse() {
		return sqlSession.selectList("itemMapper.getCateListInUse");
	}

	//상품 목록 조회
	@Override
	public List<ItemVO> getItemList(ItemVO itemVO) {
		return sqlSession.selectList("itemMapper.getItemList", itemVO);
	}

	//상품 상세 페이지 이동
	@Override
	public ItemVO getItemDetailPage(ItemVO itemVO) {
		return sqlSession.selectOne("itemMapper.getItemDetailPage", itemVO);
	}
}
