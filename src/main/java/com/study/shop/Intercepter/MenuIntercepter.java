package com.study.shop.Intercepter;


import java.util.Map;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.study.shop.admin.service.AdminService;
import com.study.shop.admin.vo.AdminSubMenuVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class MenuIntercepter implements HandlerInterceptor {
	@Resource(name = "adminService")
	private AdminService adminService;

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// 카테고리 목록 조회
		modelAndView.addObject("cateList", adminService.getCateListForAdmin());

		// 메인 메뉴 목록 조회
		modelAndView.addObject("adminMenuList", adminService.getAdminMenuList());
		
		// 서브 메뉴 목록 조회
		Map<String, Object> data = modelAndView.getModel();
		AdminSubMenuVO adminSubMenuVO = (AdminSubMenuVO)data.get("adminSubMenuVO");
		String menuCode = adminSubMenuVO.getMenuCode();
		
		// 공부용 modelview데이터 받기
		//String menuCode1 = data.get("menuCode").toString();
		//data.get("name").toString();
		//data.get("age");
		
		modelAndView.addObject("adminSubMenuList", adminService.getAdminSubMenuList(menuCode));
	}

}
