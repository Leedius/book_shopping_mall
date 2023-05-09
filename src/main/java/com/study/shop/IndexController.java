package com.study.shop;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class IndexController {
	// 프로젝트 시작 시 최초에 실행 되는 컨트롤러
	@GetMapping("/") // localhost:8081/
	public String index(HttpSession session, HttpServletRequest request, Authentication authentication) {
		
		//로그인 이전 페이지
		String previousPage = request.getHeader("Referer");
		System.out.println("이전 페이지 : " + previousPage);
		
		//기본 페이지
		String path = "";
		
		if(authentication == null) {
			path = "redirect:/item/itemList";
		}
		else {
			//세션 정보 가져오기
			User user = (User)authentication.getPrincipal();
			List<GrantedAuthority> authoList = new ArrayList<>(user.getAuthorities());
			
			List<String> strAuthoList = new ArrayList<>();
			for(GrantedAuthority autho : authoList) {
				String strAutho = autho.getAuthority();
				strAuthoList.add(autho.getAuthority());
			}
			System.out.println("@@@@@@@@@@@@@@@@ROLE 정보 : " + strAuthoList);
			//관리자로 로그인 성공시 카테고리 관리칸에 강조를 시키기 위해
			//서브메뉴코드 데이터도 함께 전송
			//컨트롤러에 if문을 써서 getSubMenuCode() == null일때 
			//SUB_MENU_001을 set해줘도 된다.
			if (strAuthoList.contains("ROLE_ADMIN")) {
				path = "redirect:/admin/cateManage";
			}
			else {
				if(previousPage == null) {
					path = "redirect:/item/itemList";
				} else {
					path = "redirect:" + previousPage;
					
					if(previousPage.contains("/admin")) {
						path = "redirect:item/itemList";
					}
				}
			}
		}

		return path;
	}

	//미인가 시 이동할 페이지
	@GetMapping("/accessDeny")
	public String accessDeny() {
		return "content/access_deny";
	}
	
}
