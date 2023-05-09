package com.study.shop.buy.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("buyDetailService")
public class BuyDetailtServiceImpl implements BuyDetailService {
	@Autowired
	private SqlSessionTemplate sqlsession;

}
