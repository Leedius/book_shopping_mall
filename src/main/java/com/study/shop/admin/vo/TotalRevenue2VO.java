package com.study.shop.admin.vo;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class TotalRevenue2VO {
	private int year;
	private int m_01;
	private int m_02;
	private int m_03;
	private int m_04;
	private int m_05;
	private int m_06;
	private int m_07;
	private int m_08;
	private int m_09;
	private int m_10;
	private int m_11;
	private int m_12;
	
	// 객체가 가진 데이터를 리스트로 리턴
	// Reflection을 사용하면 반복해서 쓸수 있음
	public List<Integer> getDataToList() {
		List<Integer> list = new ArrayList<>();
		list.add(getM_01());
		list.add(getM_02());
		list.add(getM_03());
		list.add(getM_04());
		list.add(getM_05());
		list.add(getM_06());
		list.add(getM_07());
		list.add(getM_08());
		list.add(getM_09());
		list.add(getM_10());
		list.add(getM_11());
		list.add(getM_12());
		
		return list;
	}
	
}
