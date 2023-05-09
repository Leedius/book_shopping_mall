package com.study.shop.item.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.shop.item.service.ItemService;
import com.study.shop.item.vo.ItemVO;
import com.study.shop.util.MailVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/item")
public class ItemController {
	@Resource(name = "itemService")
	private ItemService itemService;
	
	//헤더 페이지 카테고리 목록
	@GetMapping("/itemList")
	public String cateManage(Model model, ItemVO itemVO, MailVO mailVO) {
		//상품 목록 조회
		model.addAttribute("itemList", itemService.getItemList(itemVO));
		
		return "content/item/item_list";
	}
	
	//아이템 상세 페이지 이동
	@GetMapping("/itemDetailPage")
	public String itemDetailPage(Model model, ItemVO itemVO, HttpServletRequest request) {
		
		//이전 페이지 경로
		String data = request.getHeader("Referer");
		System.out.println("데이터 : " + data);
		
		//상품 상세 정보
		model.addAttribute("itemVO", itemService.getItemDetailPage(itemVO));
		return "content/item/item_detail";
	}
	
}
