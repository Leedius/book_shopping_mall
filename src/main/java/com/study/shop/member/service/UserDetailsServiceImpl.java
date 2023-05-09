package com.study.shop.member.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.study.shop.member.vo.MemberVO;

import jakarta.annotation.Resource;


//시큐리티가 로그인 할 때 자동으로 실행하는 클래스
@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService{
	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberVO memberInfo = new MemberVO();
		memberInfo.setMemId(username);
		MemberVO userInfo = memberService.login(memberInfo);
		
		if(userInfo == null) {
			throw new UsernameNotFoundException("계정 조회 오류");
		}
		
		UserDetails user = User.withUsername(userInfo.getMemId())
								.password(userInfo.getMemPw())
								.roles(userInfo.getMemRole())
								.build();
		
		return user;
	}
	
}

