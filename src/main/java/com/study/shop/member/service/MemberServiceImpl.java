package com.study.shop.member.service;


import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.shop.member.vo.MemberVO;

@Service("memberService")
public class MemberServiceImpl implements MemberService {
	@Autowired
	private SqlSessionTemplate sqlSession;

	//아이디 중복 체크
	@Override
	public Boolean isDuplicateMemId(String memId) {
		int result = sqlSession.selectOne("memberMapper.isDuplicateMemId", memId);
		return result != 0 ? true : false;
	}

	//회원 가입
	@Override
	public int regMember(MemberVO memberVO) {
		return sqlSession.insert("memberMapper.regMember", memberVO);
	}
		
	//로그인
	@Override
	public MemberVO login(MemberVO memberVO) {
		return sqlSession.selectOne("memberMapper.login", memberVO);
	}
	
	//회원이메일 정보 조회
	@Override
	public String getMemEmail(MemberVO memberVO) {
		return sqlSession.selectOne("memberMapper.getMemEmail", memberVO);
	}

	//비밀번호 찾기(초기화)
	@Override
	public void findPw(MemberVO memberVO) {
		sqlSession.update("memberMapper.findPw", memberVO);
	}
	
	//회원 정보 수정
	@Override
	public void updateMemberInfo(MemberVO memberVO) {
		sqlSession.update("memberMapper.updateUserInfo", memberVO);
	}


}
