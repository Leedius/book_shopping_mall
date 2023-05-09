package com.study.shop.buy.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.study.shop.buy.service.BuyService;
import com.study.shop.buy.vo.BuyDetailVO;
import com.study.shop.buy.vo.BuyVO;
import com.study.shop.cart.service.CartService;
import com.study.shop.member.vo.MemberVO;
import com.study.shop.util.DateUtil;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/buy")
public class BuyController {
	@Resource(name = "buyService")
	private BuyService buyService;
	@Resource(name = "cartService")
	private CartService cartService;

	// 선택 구매
	@ResponseBody
	@PostMapping("/regBuyAjax")
	public BuyVO regBuy(Authentication authentication, HttpServletResponse response, @RequestBody BuyVO buyVO)
			throws IOException {
		// 세션 정보 가져오기
		User loginInfo = (User)authentication.getPrincipal();

//		// 로그인 정보가 없으면 상품 리스트로 페이지 이동(시큐리티 사용으로 x)
//		if (loginInfo == null) {
//			response.sendRedirect("/item/itemList");
//		}

		// SHOP_BUY 테이블 INSERT를 위한 빈 값 채우기

		// 구매 코드 가져오기
		String nextBuyCode = buyService.getNextBuyCode();

		// 구매 기본 정보 저장
		buyVO.setBuyCode(nextBuyCode);
		buyVO.setMemId(loginInfo.getUsername());

		// 구매 할 각 상품에 buyCode 할당
		for (int i = 0; i < buyVO.getBuyDetailList().size(); i++) {
			buyVO.getBuyDetailList().get(i).setBuyCode(nextBuyCode);
		}

		// 장바구니 상품 구매
		buyService.regBuyCart(buyVO);

		return buyVO;
	}

	// 선택구매 선생님 버전
	@ResponseBody
	@PostMapping("/regBuy2Ajax")
	public String regBuy(Authentication authentication, @RequestBody HashMap<String, Object> buyData, BuyVO buyVO) {
		// 세션 정보 가져오기
		User loginInfo = (User)authentication.getPrincipal();

//		// 로그인 정보가 없으면 상품 리스트로 페이지 이동(시큐리티 사용으로 x)
//		if (loginInfo == null) {
//			return "redirect:/item/itemList";
//		}

		// 구매 코드 가져오기
		String nextBuyCode = buyService.getNextBuyCode();

		// 구매 기본 정보 저장
		buyVO.setBuyCode(nextBuyCode);
		buyVO.setMemId(loginInfo.getUsername());
		buyVO.setBuyPrice(Integer.parseInt(String.valueOf(buyData.get("buy_price"))));

		// ----- 구매 상세 정보 빈 값 채우기 ------//
		// 1. 상세 구매 시 모든 데이터를 바등 리스트 객체
		
		System.out.println(buyData);

		ObjectMapper mapper = new ObjectMapper();

		// 구매 상세 정보 데이터 배열로 저장
		BuyDetailVO[] buyDetailArr = mapper.convertValue(buyData.get("buy_detail_list"), BuyDetailVO[].class);
		// 구매 상세 정보 배열 데이터 리스트로 저장
		List<BuyDetailVO> buyDetailList = Arrays.asList(buyDetailArr);

		// 구매 할 각 상품에 buyCode 할당
		for (BuyDetailVO e : buyDetailList) {
			e.setBuyCode(nextBuyCode);
		}

		// 데이터 세팅
		buyVO.setBuyDetailList(buyDetailList);
		
		// 상품 주문 상태 등록
		

		// 장바구니 상품 구매
		buyService.regBuyCart(buyVO);

		return "";
	}
	
	//공부용 상품 단일 구매(바로구매)
	@ResponseBody
	@PostMapping("/buyAjax")
	public void buy(String itemCode, int itemPrice, int buyCnt, Authentication authentication, BuyVO buyVO) {
		String buyCode = buyService.getNextBuyCode();
		
		// 세션 정보 가져오기
		User loginInfo = (User) authentication.getPrincipal();
		
		int buyPrice = itemPrice * buyCnt;
		buyVO.setBuyCode(buyCode);
		
	}

	// 구매 내역 조회
	@RequestMapping("/purchaseList")
	public String getPurchaseList(Authentication authentication, Model model, String activeMenu, BuyVO buyVO) {
		// 세션 정보 가져오기
		User loginInfo = (User)authentication.getPrincipal();

//		// 로그인 정보가 없으면 상품 리스트로 페이지 이동(시큐리티 사용으로 x)
//		if (loginInfo == null) {
//			return "redirect:/item/itemList";
//		}

		// 오늘 날짜 데이터
		String nowDate = DateUtil.getNowDateToString(); // 2023-04-12
		String nowFirstDate = DateUtil.getFirstDateOfMonth();

		// 메뉴이름 넘기기
		model.addAttribute("activeMenu", activeMenu);
		
		// 로그인 세션 데이터 저장
		buyVO.setMemId(loginInfo.getUsername());

		System.out.println("데이터 확인 : " + buyService.getPurchaseList(buyVO));

		// 구매 내역 조회
		model.addAttribute("purchaseList", buyService.getPurchaseList(buyVO));

		// 넘어온 날자 데이터가 없다면 기본값으로 날짜 세팅
		if (buyVO.getFromDate() == null) {
			buyVO.setFromDate(nowFirstDate);
		}
		if (buyVO.getToDate() == null) {
			buyVO.setToDate(nowDate);
		}

		return "/content/buy/purchase_history";
	}

}
