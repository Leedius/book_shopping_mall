package com.study.shop.test.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.study.shop.admin.service.AdminService;
import com.study.shop.admin.vo.AdminMenuVO;
import com.study.shop.admin.vo.AdminSubMenuVO;
import com.study.shop.item.service.ItemService;
import com.study.shop.item.vo.CategoryVO;
import com.study.shop.test.vo.ClassVO;
import com.study.shop.test.vo.StudentVO;
import com.study.shop.test.vo.TestVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/test")
public class TestController {
	@Resource(name = "itemService")
	private ItemService itemService;

	@Resource(name = "adminService")
	private AdminService adminService;

	
	@GetMapping("/map1")
	public String map1(Model model) {
		//사용중인 카테고리 목록
		List<CategoryVO> cateList = itemService.getCateListInUse();
		
		//관리자 메뉴 목록
		List<AdminMenuVO> menuList = adminService.getAdminMenuList();
		
		//관리자 서브 메뉴 목록
		//List<AdminSubMenuVO> subMenuList = adminService.getAdminSubMenuList();
		
		Map<String, List> mapData = new HashMap<>();
		
		mapData.put("cateList", cateList);
		mapData.put("menuList", menuList);
		//mapData.put("subMenuList", subMenuList);
		
		model.addAttribute("mapData", mapData);
		
		return "test/map1";
	}
	
	@GetMapping("/json1")
	public String json_basic() {
		
		return "test/json_test";
	}
	
	//default 타입으로 데이터 받기
	@ResponseBody
	@PostMapping("/test1")
	public String test1Ajax(String name
							, int age
							, String addr
							, TestVO testVO) {
		System.out.println("test1Ajax() 메소드 실행~");
		System.out.println(name);
		System.out.println(age);
		System.out.println(addr);
		System.out.println(testVO);
		return "";
	}

	//json 커맨드 객체로 데이터 받기 
	@ResponseBody
	@PostMapping("/test2")
	public String test2Ajax(@RequestBody TestVO testVO) {
		System.out.println("test2Ajax() 메소드 실행~");
		System.out.println(testVO);
		System.out.println(testVO.getName());
		System.out.println(testVO.getAge());
		System.out.println(testVO.getAddr());
		return "";
	}
	
	//json map으로 데이터 받기
	@ResponseBody
	@PostMapping("/test3")
	public String test3Ajax(@RequestBody HashMap<String, String> map) {
		System.out.println("test3Ajax() 메소드 실행~");
		System.out.println(map);
		System.out.println(map.get("name"));
		System.out.println(map.get("age"));
		System.out.println(map.get("addr"));
		
		//map으로 받은 데이터를 자바 객체로 변환하는 기본 방식
		TestVO vo = new TestVO();
		vo.setName(map.get("name"));
		vo.setAge(Integer.parseInt(map.get("age"))); 
		vo.setAddr(map.get("addr"));
		
		//map으로 받은 데이터를 자바 객체로 변환하는 두번째 방법
		ObjectMapper mapper = new ObjectMapper();
		TestVO result = mapper.convertValue(map, TestVO.class);
		System.out.println(result);
		return "";
	}
	
	//json 커맨드 객체로 리스트 받기
	@ResponseBody
	@PostMapping("/test4")
	public String test4Ajax(@RequestBody List<TestVO> list) {
		System.out.println("test4Ajax() 메소드 실행~");
		System.out.println(list);
		return "";
	}
	
	//해당 방식으로는 데이터 받기가 안된다
	@ResponseBody
	@PostMapping("/test5")
	public String test5Ajax(ArrayList<TestVO> dataArr) {
		System.out.println("test5Ajax() 메소드 실행~");
		System.out.println(dataArr);
		return "";
	}
	
	//json, 자바스크립트의 객체 배열 데이터 받기(map으로 받기)
	@ResponseBody
	@PostMapping("/test6")
	public String test6Ajax(@RequestBody List<HashMap<String, String>> mapList) {
		System.out.println("test6Ajax() 메소드 실행~");
		System.out.println(mapList);
		System.out.println(mapList.get(0));
		System.out.println(mapList.get(0).get("name"));
		System.out.println(mapList.get(1));
		return "";
	}
	
	//json 커맨드 객체로 리스트 받기
	@ResponseBody
	@PostMapping("/test7")
	public String test7jax(@RequestBody ClassVO classVO) {
		System.out.println("test7Ajax() 메소드 실행~");
		System.out.println(classVO);
		System.out.println(classVO.getTeaName());
		System.out.println(classVO.getClassName());
		System.out.println(classVO.getStuList().get(1));
		
		return "";
	}
	
	//json 커맨드 객체로 리스트 받기
	@ResponseBody
	@PostMapping("/test8")
	public String test8jax(@RequestBody HashMap<String, Object> map) {
		System.out.println("test8Ajax() 메소드 실행~");
		
		ObjectMapper mapper = new ObjectMapper();
		
		System.out.println(map);
		//학생 리스트
		StudentVO[] stuArr = mapper.convertValue(map.get("stu_list"), StudentVO[].class);
		List<StudentVO> stulist = Arrays.asList(stuArr);
		
		//ClassVO stuList = mapper.convertValue(map.get("stuList"), ClassVO.class);
		System.out.println(stulist);
		System.out.println(stulist.get(0));
		
		
		return "";
	}
	
}
