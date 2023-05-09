package com.study.shop.admin.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.study.shop.admin.service.AdminService;
import com.study.shop.admin.vo.AdminMenuVO;
import com.study.shop.admin.vo.AdminSubMenuVO;
import com.study.shop.admin.vo.OrderStatusVO;
import com.study.shop.admin.vo.PageVO;
import com.study.shop.admin.vo.SearchOrderVO;
import com.study.shop.admin.vo.StatusInfoVO;
import com.study.shop.admin.vo.TotalRevenue2VO;
import com.study.shop.admin.vo.TotalRevenueVO;
import com.study.shop.buy.service.BuyService;
import com.study.shop.buy.vo.BuyDetailVO;
import com.study.shop.buy.vo.BuyVO;
import com.study.shop.item.service.ItemService;
import com.study.shop.item.vo.CategoryVO;
import com.study.shop.item.vo.ImgVO;
import com.study.shop.item.vo.ItemVO;
import com.study.shop.member.vo.MemberVO;
import com.study.shop.util.ConstVariable;
import com.study.shop.util.DateUtil;
import com.study.shop.util.UploadUtil;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/admin")
public class AdminController {
	@Resource(name = "adminService")
	private AdminService adminService;

	@Resource(name = "itemService")
	private ItemService itemService;

	@Resource(name = "buyService")
	private BuyService byBuyService;

	// 카테고리 관리 페이지
	@GetMapping("/cateManage")
	public String cateManage(Model model, AdminSubMenuVO adminSubMenuVO) {
		adminSubMenuVO.setMenuInfo(ConstVariable.DEFAULT_MENU_CODE, ConstVariable.DEFAULT_ITEM_SUB_MENU_CODE);

		return "content/admin/cate_manage";
	}

	// 카테고리 등록 후 실행되는 카테고리 목록 조회
	@ResponseBody
	@PostMapping("/getCateListAjax")
	public List<CategoryVO> getCateListAjax() {
		return adminService.getCateListForAdmin();
	}

	// 상품등록 페이지 이동
	@GetMapping("/regItemPage")
	public String regItemForm(Model model, AdminSubMenuVO adminSubMenuVO) {
		// 받아오는 메뉴코드가 없어 전달
		adminSubMenuVO.setMenuInfo("MENU_001", "SUB_MENU_002");

		// 사용중인 카테고리 목록 조회
		model.addAttribute("cateListInUse", itemService.getCateListInUse());
		return "content/admin/reg_item";
	}

	// 상품관리 페이지 이동
	// ItemVO에 SearchVO가 있어서 굳이 매개변수로 줄 필요가 없다.
	// @RequestMapping 어노테이션으로 요청을 받으면 get,post 둘 다 받을 수있음.
	// 정석 방법
	// @RequestMapping(value = "/itemManage", method= RequestMehod.get)
	// @RequestMapping(value = "/itemManage", method= RequestMehod.post)
	@RequestMapping("/itemManage")
	public String stockManage(Model model, AdminSubMenuVO adminSubMenuVO, ItemVO itemVO) {

		// 받아오는 메뉴코드가 없어 전달
		adminSubMenuVO.setMenuInfo("MENU_001", "SUB_MENU_003");

		// 카테고리 목록 조회
		model.addAttribute("cateList", adminService.getCateListForAdmin());

		// 상품 목록 조회
		model.addAttribute("itemList", adminService.getItemList(itemVO));

		return "content/admin/item_manage";
	}

	// 카테고리 중복 확인
	@ResponseBody
	@PostMapping("/checkCateNameAjax")
	public int checkCateName(String cateName) {
		// 카테고리명 중복 여부 체크 쿼리
		return adminService.checkCateName(cateName);
	}

	// 카테고리 등록
	@ResponseBody
	@PostMapping("/regCategoryAjax")
	public List<CategoryVO> regCategory(String cateName) {
		// 카테고리 insert
		adminService.regCategory(cateName);
		return adminService.getCateListForAdmin();
	}

	// 카테고리 삭제
	@GetMapping("/deleteCategory")
	public String deleteCategory(String cateCode, AdminSubMenuVO adminSubMenuVO) {
		adminService.deleteCategory(cateCode);
		// 카테고리 삭제
		return "redirect:/admin/cateManage";
	}

	// isUse값 업데이트
	@ResponseBody
	@PostMapping("/updateIsUseAjax")
	public int updateIsUse(String cateCode) {
		return adminService.updateIsUse(cateCode);
	}

	// 상품 등록
	// subImg는 여러파일이 동시에 들어오기때문에 배열로 만든다!!.
	@PostMapping("/regItem")
	public String regItem(ItemVO itemVO, MultipartFile mainImg, MultipartFile[] subImg, AdminSubMenuVO adminSubMenuVO) {
		// 등록될 상품 코드 조회
		String itemCode = adminService.getNextItemCode();

		// 등록될 상품 코드 저장
		itemVO.setItemCode(itemCode);

		// 파일첨부
		// 1.메인 이미지 업로드
		ImgVO attachedImgVO = UploadUtil.uploadFile(mainImg);

		// 2.서브 이미지들 업로드
		List<ImgVO> attachedImgList = UploadUtil.multiFileUpload(subImg);

		// 상품 이미지 DB 등록
		// 상품 이미지 등록 쿼리 실행 시 모든 빈 값을 채워줄
		// 데이터를 가진 리스트
		List<ImgVO> imgList = attachedImgList;
		imgList.add(attachedImgVO);

		// ITEM_CODE 데이터 추가
		for (ImgVO img : imgList) {
			img.setItemCode(itemCode);
		}

		// itemVO에 imgList를 정의 해줘서 리스트 데이터 저장가능
		itemVO.setImgList(imgList);

		// 상품 등록 쿼리(바로위에 이미지 저장도 하고 나서 등록해야하기 때문에
		// 마지막에 와야한다.!!
		adminService.regItem(itemVO);

		return "redirect:/admin/regItemPage";
	}

	// 상품 상태에 따른 상품 목록 조회
	@ResponseBody
	@PostMapping("/selectStatusItemAjax")
	public List<ItemVO> selectStatusItem(ItemVO itemVO) {
		System.out.println("상품 상태" + itemVO.getItemStatus());
		return adminService.getItemList(itemVO);
	}

	// 아이템 상세정보 조회
	@Transactional(rollbackFor = Exception.class)
	@ResponseBody
	@PostMapping("/getItemDetailAjax")
	public Map<String, Object> getItemDetailAjax(ItemVO itemVO) {
		// 카테고리 목록
		List<CategoryVO> cateList = itemService.getCateListInUse();

		// 상품 상세 정보
		ItemVO item = adminService.getItemDetailAjax(itemVO);

		Map<String, Object> mapData = new HashMap<>();
		mapData.put("item", item);
		mapData.put("cateList", cateList);

		return mapData;
	}

	// 상품 수정
	@PostMapping("/updateItemInfo")
	public String updateItem(ItemVO itemVO, AdminSubMenuVO adminSubMenuVO) {
		System.out.println("아이템 정보" + itemVO);
		adminService.updateItemInfo(itemVO);
		return "redirect:/admin/itemManage";
	}

	//회원관리 페이지
	@GetMapping("/memberManage")
	public String memberManage(AdminSubMenuVO adminSubMenuVO, Model model) {
		// active를 위한 서브메뉴 코드 전달
		adminSubMenuVO.setMenuInfo(null, ConstVariable.DEFAULT_MEMBER_SUB_MENU_CODE);
		
		//회원 목록 조회
		List<MemberVO> memberList = adminService.getMemberList();
		model.addAttribute("memberList", memberList);

		return "content/admin/member_manage";
	}
	
	//회원 권한 변경
	@ResponseBody
	@PostMapping("/memRoleUpdateAjax")
	public void roleChange(MemberVO memberVO) {
		adminService.memRoleUpdate(memberVO);
	}

	// 주문 관리 페이지 이동
	@RequestMapping("/orderManage")
	public String orderManage(Model model, AdminSubMenuVO adminSubMenuVO, SearchOrderVO searchOrderVO, PageVO pageVO) {
		// active를 위한 서브메뉴 코드 전달
		adminSubMenuVO.setMenuInfo("MENU_003", ConstVariable.DEFAULT_ORDER_SUB_MENU_CODE);

		// modelview 공부용 데이터 전달
		model.addAttribute("name", "홍길동");
		model.addAttribute("age", 20);
		
		// ORDER BY조건 기본 BUY_DATE로 설정
		if(searchOrderVO.getSearchOrderBy() == null) {
			searchOrderVO.setSearchOrderBy("BUY_DATE_ORDER");
		}
		
		// 페이징 정보 세팅
		// 글 개수 데이터 저장
		int totalDataCnt = adminService.getOrderCount(searchOrderVO);
		System.out.println("@@@@@@@@@데이터 확인용 : " + totalDataCnt);
		pageVO.setTotalDataCnt(totalDataCnt);
		pageVO.setPageInfo();
		
		//	주문 목록 조회
		List<OrderStatusVO> orderStatusList = adminService.getOrderList(searchOrderVO, pageVO);
		model.addAttribute("orderStatusList", orderStatusList);

		
		// 주문 상태 코드 목록 조회
		List<StatusInfoVO> statusInfoList = adminService.getStatusInfoList();
		
		// 주문 상태별 내역 조회
		// 주문 상태별 주문 정보를 모두 담을 수 있는 map
		Map<Integer, List<OrderStatusVO>> orderStatusMap = new TreeMap<>();
		
		for(StatusInfoVO statusInfo : statusInfoList) {
			orderStatusMap.put(statusInfo.getStatusCode(), adminService.getOrderStatus(String.valueOf(statusInfo.getStatusCode())));
		}
		model.addAttribute("orderStatusMap", orderStatusMap);
		
		// 주문 상태(버튼이름) 목록 데이터 전송
		model.addAttribute("statusInfoList", statusInfoList);
		
		// 주문 상태(이름) 목록 데이터 전송
		model.addAttribute("titleMap", getStatusInfoName());

		return "content/admin/order_manage";
	}
	
	//주문 상세 모달창
	@ResponseBody
	@PostMapping("/orderDetailModalAjax")
	public List<BuyVO> orderDetailModal(BuyVO buyVO){
		
		System.out.println("@@@@@@@@@@@@@@@확인용 : " + buyVO);
		List<BuyVO> orderDetailList = byBuyService.getPurchaseList(buyVO);
		
		return orderDetailList;
	}
	
	// 주문 상태 다음 레벨로 이동
	@ResponseBody
	@PostMapping("/orderNextLevelAjax")
	public Map<String, List<OrderStatusVO>> orderNextLevel(@RequestBody HashMap<String, Object> paramData) {
		
		System.out.println("@@@@@@@데이터 확인용 " + paramData);
		
		// 주문 상태 업데이트할 데이터를 갖는 map 데이터
		Map<String, Object> updateMap = new HashMap<>();
		//상태코드
		updateMap.put("statusCode", paramData.get("statusCode"));
		//선택한 주문목록
		updateMap.put("orderNumList", paramData.get("orderNumList"));
		//주문상태 업데이트 쿼리
		adminService.updateOrderStatus(updateMap);

		
//		//내가한 버전(리턴타입 Map<Integer, List<OrderStatusVO>> 로 바꿔야됨;
//		// 주문 상태 목록 (상태별) 담을 객체 생성
//		Map<Integer, List<OrderStatusVO>> updateOrderList = new HashMap<>();
//		
//		// 주문 상태 코드 목록 조회
//		List<StatusInfoVO> statusInfoList = adminService.getStatusInfoList();
//		
//		for(StatusInfoVO statusInfo : statusInfoList) {
//			updateOrderList.put(statusInfo.getStatusCode(), adminService.getOrderStatus(String.valueOf(statusInfo.getStatusCode())));
//		}
		
		//선생님 버전
		//변경 후 화면에 보여줘야할 리스트 목록 2개
		//object -> string -> int형변환
		//map에 담아 리턴
		Map<String, List<OrderStatusVO>> result = new HashMap<>();
		String afterStatusCode = paramData.get("statusCode").toString();
		String beforeStatusCode = Integer.toString(Integer.parseInt(afterStatusCode)+1);
		
		result.put("firstOrderList", adminService.getOrderStatus(afterStatusCode)); 
		result.put("secondOrderList",adminService.getOrderStatus(beforeStatusCode));
		
		
		return result;
	}
	
	

	// 월별 매출 현황 페이지 이동
	@GetMapping("/saleStatusPerMonth")
	public String orderControl(Model model, AdminSubMenuVO adminSubMenuVO,
			@RequestParam(required = false, defaultValue = "0") int year) {

		// 카테고리 목록 조회
		adminSubMenuVO.setMenuInfo(null, "SUB_MENU_007");

		model.addAttribute("cateList", adminService.getCateListForAdmin());

		System.out.println("메뉴 코드 : " + adminSubMenuVO.getMenuCode());

		model.addAttribute("menuCode", adminSubMenuVO.getMenuCode());

		// 월매출 데이터 전송
		// 1.월매출 조회
		List<TotalRevenueVO> totalRevenueList = adminService.getRevenueList();

		List<Map<String, Object>> revenueList = new ArrayList<>();
		for (TotalRevenueVO revenue : totalRevenueList) {
			Map<String, Object> revenueMap = new HashMap<>();
			revenueMap.put("year", revenue.getYear());
			revenueMap.put("month", revenue.getMonth());
			revenueMap.put("buyCnt", revenue.getBuyCnt());
			revenueMap.put("buyDetailCnt", revenue.getBuyDetailCnt());
			revenueMap.put("revenue", revenue.getRevenue());
			revenueList.add(revenueMap);
		}
		// json 형태로 변환
		ObjectMapper objectMapper = new ObjectMapper();
		String totalRevenueJson = null;
		try {
			totalRevenueJson = objectMapper.writeValueAsString(revenueList);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		// 올해 년도 설정
		if (year == 0) {
			year = DateUtil.getYear();
		}

		// 1-1.월매출 조회(DECODE 활용 쿼리 사용)
		// 1-1-1 VO를 생성해서 하는 법
		List<TotalRevenue2VO> totalRevenueList2 = adminService.getRevenueList2(year);

		// 1-1-2 MAP으로 받아오는 법

		// 순서를 주기 위해 트리맵 리스트 객채 생성
		List<Map<String, Integer>> totalRevenueMap = new ArrayList<>();
		// 맵을 하나씩 뽑아서 트리맵으로 변환
		for (Map<String, Integer> map : adminService.getRevenueList3(year)) {
			TreeMap<String, Integer> treeMap = new TreeMap<>(map);
			totalRevenueMap.add(treeMap);
		}
		for (Map<String, Integer> map : totalRevenueMap) {
			// 맵에 들어 있는 모든 키값
			// 순번이 없고 중복 불가능
			Set<String> ketset = map.keySet();
			for (String key : ketset) {
				System.out.println("key : " + key + " / value = " + map.get(key));
			}
			System.out.println();
		}
		// 데이터 전송
		model.addAttribute("totalRevenueList2", totalRevenueMap);

		// json 형태로 변환
		String totalRevenueJson2 = null;
		try {
			totalRevenueJson2 = objectMapper.writeValueAsString(totalRevenueMap);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		// 2-1데이터 전송(선생님 버전)
		model.addAttribute("totalRevenueList2", totalRevenueMap);
		model.addAttribute("totalRevenueList3", totalRevenueJson2);

		// 2-2월매출 데이터 전송
		model.addAttribute("totalRevenueList", totalRevenueJson);

		// year라는 이름으로 데이터가 넘어오면 넘어오는 데이터 전달
		// 데이터가 안넘어오면 올해의 연도 전달
		model.addAttribute("year", year);
		// 올해 연도 전달
		model.addAttribute("thisYear", DateUtil.getYear());

		System.out.println("데이터 확인 : " + year);

		return "content/admin/sale_manage";
	}

	// 월별 차트 Ajax
	@ResponseBody
	@PostMapping("/getChartDataAjax")
	public Map<String, List<Integer>> getChartDataAjax(@RequestParam(required = false, defaultValue = "0") int year) {

		System.out.println("데이터 확인 : " + year);

		List<TotalRevenue2VO> list = adminService.getRevenueList2(year);

		// 판매 건수
		List<Integer> cntList = list.get(0).getDataToList();
		// 판매 금액
		List<Integer> revenueList = list.get(1).getDataToList();

		System.out.println("ajax용 데이터" + list);

		Map<String, List<Integer>> mapData = new HashMap<>();
		mapData.put("buyCnt", cntList);
		mapData.put("revenue", revenueList);

		System.out.println("ajax용 데이터" + mapData);

		return mapData;
	}

	// 카테고리별 판매 추이 페이지 이동
	@RequestMapping("/saleStatusByCategory")
	public String getCateChartData(AdminSubMenuVO adminSubMenuVO) {
		return "/content/admin/cate_sale_trend";
	}

	// 카테고리별 판매 추이 차트
	@ResponseBody
	@PostMapping("/saleStatusByCategoryAjax")
	public List<Map<String, Object>> getCateChartDataAjax(Model model) {
		List<Map<String, Object>> cateSaleList = adminService.getCateChartDataAjax();

		System.out.println("MAP데이터 확인 : " + cateSaleList);

		return cateSaleList;
	}
	
	
	
	//테스트 페이지 이동
	@GetMapping("/test3")
	public String test3(AdminSubMenuVO adminSubMenuVO) {
		adminSubMenuVO.setMenuInfo(ConstVariable.DEFAULT_MENU_CODE, ConstVariable.DEFAULT_ITEM_SUB_MENU_CODE);
		return "/test/test";
	}
	

	//---------------------기능을 위한 메소드------------------//
	//상태별 제목 정보
	public Map<Integer, String> getStatusInfoName() {
		Map<Integer, String> orderStatusMap = new HashMap<>();
		orderStatusMap.put(1, ConstVariable.STATUS_INFO_1);
		orderStatusMap.put(2, ConstVariable.STATUS_INFO_2);
		orderStatusMap.put(3, ConstVariable.STATUS_INFO_3);
		orderStatusMap.put(4, ConstVariable.STATUS_INFO_4);
		orderStatusMap.put(5, ConstVariable.STATUS_INFO_5);
		
		return orderStatusMap;
	}

	
}
