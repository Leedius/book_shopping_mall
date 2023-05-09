package com.study.shop.Intercepter;

import org.springframework.web.servlet.HandlerInterceptor;

import com.study.shop.member.vo.MemberVO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class AuthoIntercepter implements HandlerInterceptor {

	@Override
	//관리자가 아니면 관리자 페이지 접근을 막는 기능	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		//세션 데이터 가져오기
		HttpSession session = request.getSession();
		MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
		
		boolean condition1 = loginInfo == null;
		//순서 지킬것! loginInfo.getMemRole().equals("USER") 이게 먼저 나오면
		//저거 부터 해석하기 때문에 null이면 오류남
		boolean condition2 = loginInfo != null && loginInfo.getMemRole().equals("USER");
		
		if(condition1 || condition2) {
			response.sendRedirect("/");
			return false;
		}
 		return true;
	}
}
