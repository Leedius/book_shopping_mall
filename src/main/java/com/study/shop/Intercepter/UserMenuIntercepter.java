package com.study.shop.Intercepter;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.study.shop.item.service.ItemService;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class UserMenuIntercepter implements HandlerInterceptor {
	@Resource(name = "itemService")
	private ItemService itemService;
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		//사용중 카테고리 목록 조회
		modelAndView.addObject("cateList", itemService.getCateListInUse());
	}
	
}
