package com.study.shop.Intercepter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class IntercepterConfig implements WebMvcConfigurer {

	// 인터셉터 기능을 구현할 메소드 선택
	// db를 사용하는 인터셉터는 ajax와 혼용되면
	// 에러가 난다. 그래서 컨트롤러중 ajax가 있으면 
	//그 메소드는 제외 시켜야한다.
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// 메뉴 목록들 조회(관리자 화면)
		registry.addInterceptor(getMenuIntercepter()).order(2)
				.addPathPatterns("/admin/**")
				.excludePathPatterns("/admin/*Ajax")
				.excludePathPatterns("/admin/deleteCategory")
				.excludePathPatterns("/admin/regItem")
				.excludePathPatterns("/admin/updateItemInfo");
		
		// 메뉴 목록 조회(유저 화면)
		registry.addInterceptor(getUserMenuIntercepter())
				.addPathPatterns("/item/**")
				.addPathPatterns("/cart/**")
				.addPathPatterns("/buy/**")
				.addPathPatterns("/member/loginPage")
				.excludePathPatterns("/item/*Ajax")
				.excludePathPatterns("/cart/*Ajax")
				.excludePathPatterns("/buy/*Ajax");
		
		// 유저 내정보 서브 메뉴(유저 내정보 화면)
		registry.addInterceptor(getUserInfoSubMenuIntercepter())
				.addPathPatterns("/cart/**")
				.excludePathPatterns("/cart/*Ajax");
					
		
		
//		// ajax 실행되는 메소드에는 인터셉터를 제외 시켜야 함!
//		// 관리자 로그인 되있는지 확인
//		registry.addInterceptor(getAuthoIntercepter()).order(1) // 몇번째로 실행
//				.addPathPatterns("/admin/**").excludePathPatterns("/admin/*Ajax");
	}

	@Bean // 객체 -> 리턴되는 데이터를 객체로 생성
	// MenuIntercepter가 실행 되기전에 @Configuration 먼저 실행 되기때문에
	// 이렇게 객체를 만들어서 기능 구현 메소드 선택에 사용한다.
	public MenuIntercepter getMenuIntercepter() {
		return new MenuIntercepter();
	}

//	// AuthoIntercepter 객체 생성
//	@Bean
//	public AuthoIntercepter getAuthoIntercepter() {
//		return new AuthoIntercepter();
//	}
	
	// UserMenuIntercepter 객체 생성
	@Bean
	public UserMenuIntercepter getUserMenuIntercepter() {
		return new UserMenuIntercepter();
	}
	
	@Bean
	public UserInfoSubMenuIntercepter getUserInfoSubMenuIntercepter() {
		return new UserInfoSubMenuIntercepter();
	}
}
