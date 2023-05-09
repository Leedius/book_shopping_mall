package com.study.shop.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	//인증과 인가에 대한 설정 세팅
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity security) throws Exception {
		
		security.csrf().disable()
				.authorizeHttpRequests()
				.requestMatchers("/"
								, "/item/itemList"
								, "/member/isDuplicateMemId"
								, "/item/itemDetailPage"
								, "/member/regMember"
								, "/member/loginPage"
								, "/member/findPwAjax"
								, "/member/findPw").permitAll()
				.requestMatchers("/admin/**").hasRole("ADMIN")
				//권한이 여러개 있을때 아래와 같이 코드작성
				//.requestMatchers("/admin").hasAnyRole("ADMIN", "MANAGER")
				.anyRequest().authenticated()
			.and()
				.formLogin()
				.loginPage("/member/loginPage")
				.usernameParameter("memId")
				.passwordParameter("memPw")
				.loginProcessingUrl("/member/login")
				.successHandler(geSuccessHandler())
				.failureHandler(getFailureHandler())
				.permitAll()
			.and()
				.logout()
				.logoutUrl("/member/logout")
				.invalidateHttpSession(true)
				.logoutSuccessUrl("/")
			.and()
			 	.exceptionHandling()
	            .accessDeniedPage("/accessDeny");
				//.AccessDeniedHandler(참고용)
		return security.build();
	}
	
	//암호화 객체 생성
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	//로그인 성공시 실행되는 핸들러 객체생성
	@Bean
	public SuccessHandler geSuccessHandler() {
		return new SuccessHandler();
	}
	
	//로그인 실패시 실행되는 핸들러 객체생성
	@Bean
	public FailureHandler getFailureHandler() {
		return new FailureHandler();
	}
	
	//js, img, css 접근제한 해제
	@Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/js/**", "/css/**", "/upload/**", "/image/**");
    }

}
