package com.study.shop.cart.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.shop.cart.service.CartService;
import com.study.shop.cart.vo.CartVO;
import com.study.shop.member.vo.MemberVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/cart")
public class CartController {
	@Resource(name = "cartService")
	private CartService cartService;

	// 카트 목록 조회
	@GetMapping("/cartList")
	public String getCartList(Model model, Authentication authentication, CartVO cartVO, @RequestParam(required = false, defaultValue = "cartList") String activeMenu) {
		// 로그인 세션 데이터 받아오기
		User loginInfo = (User)authentication.getPrincipal();

//		// 로그인 정보가 없으면 상품 리스트로 페이지 이동(시큐리티 사용으로 x)
//		if (loginInfo == null) {
//			return "redirect:/item/itemList";
//		}

		// 카트VO에 세션 아이디 저장
		cartVO.setMemId(loginInfo.getUsername());

		// 카트 목록 보내기
		List<CartVO> cartList = cartService.getCartList(cartVO);
		model.addAttribute("cartList", cartList);

		// 총 구매금액 계산
		int orderTotalPrice = 0;

		for (CartVO cart : cartList) {
			orderTotalPrice += cart.getTotalPrice();
		}
		model.addAttribute("orderTotalPrice", orderTotalPrice);


		return "content/cart/cart_list";
	}

	// 상품 카트 등록
	@ResponseBody
	@PostMapping("/regCartAjax")
	public void regCartAjax(CartVO cartVO, Authentication authentication, String activeMenu, Model model) {
		// 세션 정보 cartVO에 저장
		User loginInfo = (User)authentication.getPrincipal();
		cartVO.setMemId(loginInfo.getUsername());

		// 상품 카트 등록 쿼리 실행
		cartService.regCartAjax(cartVO);
	}

	// 카트 상품 수량 수정
	@GetMapping("/updateCart")
	public String updateCart(CartVO cartVO) {
		cartService.updateCart(cartVO);
		return "redirect:/cart/cartList";
	}

	// 카트 상품 삭제
	@GetMapping("/delCartItem")
	public String delCartItem(CartVO cartVO) {
		cartService.delCartItem(cartVO);
		return "redirect:/cart/cartList";
	}

	// 선택 상품 삭제
	@GetMapping("/deleteCarts")
	public String deleteCarts(String[] cartCodes, CartVO cartVO) {
		// 배열을 리스트로 변경
		List<String> cartCodeList = Arrays.asList(cartCodes);

		// 카트vo에 선택한 카트코드 리스트 저장
		cartVO.setCartCodeList(cartCodeList);

		// 카트 상품 선택 삭제 쿼리 실행
		cartService.deleteCarts(cartVO);

		return "redirect:/cart/cartList";
	}

}
