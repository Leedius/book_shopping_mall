package com.study.shop.member.service;

import com.study.shop.member.vo.MemberVO;

public interface MemberService {
	//아이디 중복 체크
	public Boolean isDuplicateMemId(String memId);
	
	//회원가입
	public int regMember(MemberVO memberVO);
	
	//로그인
	public MemberVO login(MemberVO memberVO);
	
	//회원정보수정
	void updateMemberInfo(MemberVO memberVO);
	
	//회원이메일 정보 조회
	String getMemEmail(MemberVO memberVO);
	
	//비밀번호 찾기(비밀번호 초기화)
	public void findPw(MemberVO memberVO);
	
}
