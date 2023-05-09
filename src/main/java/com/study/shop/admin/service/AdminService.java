package com.study.shop.admin.service;

import java.util.List;
import java.util.Map;

import com.study.shop.admin.vo.AdminMenuVO;
import com.study.shop.admin.vo.AdminSubMenuVO;
import com.study.shop.admin.vo.OrderStatusVO;
import com.study.shop.admin.vo.PageVO;
import com.study.shop.admin.vo.SearchOrderVO;
import com.study.shop.admin.vo.StatusInfoVO;
import com.study.shop.admin.vo.TotalRevenue2VO;
import com.study.shop.admin.vo.TotalRevenueVO;
import com.study.shop.buy.vo.BuyDetailVO;
import com.study.shop.buy.vo.BuyVO;
import com.study.shop.item.vo.CategoryVO;
import com.study.shop.item.vo.ItemVO;
import com.study.shop.member.vo.MemberVO;

import ch.qos.logback.core.status.Status;

public interface AdminService {
	
	// 카테고리 목록 조회
	public List<CategoryVO> getCateListForAdmin();

	// 카테고리 등록
	public int regCategory(String cateName);
		
	// 카테고리 중복 체크
	public int checkCateName(String cateName);
	
	// 카테고리 삭제
	public int deleteCategory(String cateCode);

	// isUse업데이트
	public int updateIsUse(String cateCode);

	// 어드민 메뉴 리스트 조회
	public List<AdminMenuVO> getAdminMenuList(); 

	// 어드민 서브 메뉴 리스트 조회
	public List<AdminSubMenuVO> getAdminSubMenuList(String menuCode);

	// 상품 등록
	public int regItem(ItemVO itemVO);

	// 다음 등록될 상품 코드 조회
	public String getNextItemCode();

	// 상품 목록 조회(상품 검색 기능 포함)
	public List<ItemVO> getItemList(ItemVO itemVO);

	// 상품관리 - 상품 상세 조회
	public ItemVO getItemDetailAjax(ItemVO itemVO);

	// 상품관리 - 상품 정보 수정
	public int updateItemInfo(ItemVO itemVO);
	
	// 회원목록 조회
	public List<MemberVO> getMemberList();
	
	// 회원권한 변경
	public void memRoleUpdate(MemberVO memberVO);
	
	// 주문 상태목록(이름,코드) 조회
	public List<StatusInfoVO> getStatusInfoList();
	
	// 주문 목록 카운트 조회
	public int getOrderCount(SearchOrderVO searchOrderVO);
	
	// 주문 관리 : 주문 정보 조회
	public List<OrderStatusVO> getOrderList(SearchOrderVO searchOrderVO, PageVO pageVO);
	
	// 주문 관리 : 주문 정보 조회(주문 상태 별)
	public List<OrderStatusVO> getOrderStatus(String searchOrderStatus);
	
	// 주문 상태 다음 레벨로 이동
	public void updateOrderStatus(Map<String, Object> updateMap);
	
	// 매출조회
	public List<TotalRevenueVO> getRevenueList();

	// 매출조회(DECODE 활용)
	public List<TotalRevenue2VO> getRevenueList2(int year);
	
	// 매출조회(DECODE 활용)
	public List<Map<String, Integer>> getRevenueList3(int year);
	
	// 카테고리별 판매 추이
	public List<Map<String, Object>> getCateChartDataAjax();
}
