package com.study.shop.member.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.shop.member.service.MemberService;
import com.study.shop.member.vo.MemberVO;
import com.study.shop.util.MailService;
import com.study.shop.util.MailVO;

import jakarta.annotation.Resource;
import jakarta.mail.Address;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;

@Controller
@RequestMapping("/member")
public class MemberController {
	@Resource(name = "memberService")
	private MemberService memberService;
	@Autowired
	private PasswordEncoder encoder;
	@Resource(name = "mailService")
	private MailService mailService;
	
	//아이디 중복 체크
	@ResponseBody
	@PostMapping("/isDuplicateMemId")
	public Boolean checkId(MemberVO memberVO) {
		//아이디 중복 체크 쿼리 실행
		return memberService.isDuplicateMemId(memberVO.getMemId());
	}
	
	//회원가입
	@PostMapping("/regMember")
	public String regMember(MemberVO memberVO) {
		
		//비밀번호 암호화
		memberVO.setMemPw(encoder.encode(memberVO.getMemPw()));
		
		//회원 가입 쿼리 실행
		memberService.regMember(memberVO);
		return "redirect:/";
	}
	
//	//회원가입(다른 방법)(시큐리티 쓰기전)
//	@PostMapping("/regMember")
//	public String regMember(@RequestParam("memTell") String[] memTell, MemberVO memberVO) {
//		//배열 값을 setter에 전달
//		memberVO.setMemTell(memTell); // 프로퍼티에 할당
//		//회원 가입 쿼리 실행
//		memberService.regMember(memberVO);
//		return "redirect:/";
//	}
	
	//로그인 페이지로 이동
	@GetMapping("/loginPage")
	public String loginPage() {
		return "content/member/login";
	}
	
	//로그인을 위한 로그인 정보 가져오기
	@GetMapping("/getMemberForInfo")
	public MemberVO getMemberForInfo(MemberVO memberVO) {
		return memberService.login(memberVO);
	}
	
//	//로그인(시큐리티 쓰기전)
//	@ResponseBody
//	@PostMapping("/login")
//	public boolean login(MemberVO memberVO, HttpSession session, Model model, Authentication authentication) {
//		//로그인 쿼리
//		MemberVO loginInfo = memberService.login(memberVO);
//		//세션에 저장
//		if(loginInfo != null) {
//			session.setAttribute("loginInfo", loginInfo);
//		}
//		return loginInfo != null ? true : false;
//	}
	
//	//로그아웃(시큐리티 쓰기전)
//	@GetMapping("/logout")
//	public String logout(HttpSession session) {
//		//세션에서 정보 삭제
//		session.removeAttribute("memName");
//		return "redirect:/";
//	}
	
	//회원 정보 수정 페이지 이동
	@GetMapping("/updateMemberInfo")
	public String updateMemberInfoPage(Model model, String activeMenu) {
		model.addAttribute("activeMenu", activeMenu);
		return "content/member/update_member_form";
	}
	
	//회원 정보 수정
	@RequestMapping("/updateMemberInfo")
	public String updateMemberInfo(Model model, String activeMenu, MemberVO memberVO, Authentication authentication) {
		//로그인 인증 정보 받아오기
		User userInfo = (User)authentication.getPrincipal();
		
		//인증아이디 저장
		memberVO.setMemId(userInfo.getUsername());
		//비밀번호 암호화
		memberVO.setMemPw(encoder.encode(memberVO.getMemPw()));
		
		//회원 정보 수정
		memberService.updateMemberInfo(memberVO);
		
		return "redirect:/item/itemList";
	}
	
	//비밀번호 찾기
	@PostMapping("/findPw")
	public String findPw(MemberVO memberVO, MailVO mailVO) {
		//회원 정보 가져오기
		MemberVO memberInfo = memberService.login(memberVO);
		
		//임시 비밀번호 생성
		String resetPw = mailService.createRandPw();
		memberVO.setMemPw(resetPw);
		
		//회원 이메일 가져오기
		if(memberInfo.getMemEmail() == null) {
			
		}
		
		
		//비밀번호 안내 메일 제목
		mailVO.setTitle("임시 비밀번호 안내입니다.");
		
		List<InternetAddress> addressList = new ArrayList<>();
		try {
			addressList.add(new InternetAddress(memberInfo.getMemEmail()));
		} catch (AddressException e) {
			e.printStackTrace();
		}

		mailVO.setAddressList(addressList);
		
		mailService.sendHTMLEmail(mailVO, memberVO);
		
		//임시비밀번호 암호화
		memberVO.setMemPw(encoder.encode(resetPw));
		
		//비밀번호 초기화
		memberService.findPw(memberVO);
		
		return "redirect:/item/itemList";
	}
	
	//비밀번호 찾기(ajax이용)
	@ResponseBody
	@PostMapping("/findPwAjax")
	public boolean findPwAjax(MemberVO memberVO, MailVO mailVO) {
		
		//임시 비밀번호 생성
		String resetPw = mailService.createRandPw();
		memberVO.setMemPw(resetPw);
		
		//회원 이메일 가져오기
		String memEmail = memberService.getMemEmail(memberVO);
		if(memEmail != null) {
			// 비밀번호 안내 메일 제목
			mailVO.setTitle("임시 비밀번호 안내입니다.");
			List<InternetAddress> addressList = new ArrayList<>();
			try {
				addressList.add(new InternetAddress(memEmail));
			} catch (AddressException e) {
				e.printStackTrace();
			}
			mailVO.setAddressList(addressList);
		
			mailService.sendHTMLEmail(mailVO, memberVO);
			
			// 임시비밀번호 암호화
			memberVO.setMemPw(encoder.encode(resetPw));

			// 비밀번호 초기화
			memberService.findPw(memberVO);

			
		}
		return memEmail != null ? true : false;
	}
}
