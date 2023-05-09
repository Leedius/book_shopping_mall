package com.study.shop.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class FailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		
		//에러메세지
		String eMsg;
		String isError;
		
		if(exception instanceof BadCredentialsException) {
			eMsg = "아이디 혹은 비밀번호를 확인하세요.";
			isError = "true";
		}
		//계정이 없거나
		else if(exception instanceof UsernameNotFoundException) {
			eMsg = "계정이 존재하지 않습니다.";
			isError = "true";
		}
		else {
			eMsg = "알수 없는 이유로 로그인에 실패했습니다.";
			isError = "true";
		}
		
		//로그인시 입력한 아이디값
		String memId = request.getParameter("memId");
		
		//로그인 실패 시 페이지 이동
		PrintWriter p = response.getWriter();
		p.write("fail");
		p.flush();
	}

	
}
