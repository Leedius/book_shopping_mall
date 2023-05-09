package com.study.shop.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.shop.admin.vo.AdminMenuVO;
import com.study.shop.admin.vo.AdminSubMenuVO;
import com.study.shop.admin.vo.OrderStatusVO;
import com.study.shop.admin.vo.PageVO;
import com.study.shop.admin.vo.SearchOrderVO;
import com.study.shop.admin.vo.StatusInfoVO;
import com.study.shop.admin.vo.TotalRevenue2VO;
import com.study.shop.admin.vo.TotalRevenueVO;
import com.study.shop.buy.vo.BuyDetailVO;
import com.study.shop.item.vo.CategoryVO;
import com.study.shop.item.vo.ItemVO;
import com.study.shop.member.vo.MemberVO;

@Service("adminService")
public class AdminServiceImpl implements AdminService {
	@Autowired
	private SqlSessionTemplate sqlSession;

	//카테고리 목록 조회
	@Override
	public List<CategoryVO> getCateListForAdmin() {
		return sqlSession.selectList("adminMapper.getCateListForAdmin");
	}

	//카테고리 등록
	@Override
	public int regCategory(String cateName) {
		return sqlSession.insert("adminMapper.regCate", cateName);
	}

	//카테고리 중복 체크
	@Override
	public int checkCateName(String cateName) {
		return sqlSession.selectOne("adminMapper.checkCateName", cateName);
	}

	//카테고리 삭제
	@Override
	public int deleteCategory(String cateCode) {
		return sqlSession.delete("adminMapper.deleteCategory", cateCode);
	}

	//isUse업데이트
	@Override
	public int updateIsUse(String cateCode) {
		return sqlSession.update("adminMapper.updateIsUse", cateCode);
	}

	//어드민 메뉴 리스트 조회
	@Override
	public List<AdminMenuVO> getAdminMenuList() {
		return sqlSession.selectList("adminMapper.getAdminMenuList");
	}

	//어드민 서브 메뉴 리스트 조회
	@Override
	public List<AdminSubMenuVO> getAdminSubMenuList(String menuCode) {
		return sqlSession.selectList("adminMapper.getAdminSubMenuList", menuCode);
	}

	//상품 등록
	//@Transactional : 해당 메소드 내의 쿼리 실행은 트랜젝션 처리
	//rollbackFor : 언제 롤백할꺼냐?(어떤 오류가 발생하면 롤백?)
	@Override
	@Transactional(rollbackFor = Exception.class)	//트랜젝션
	public int regItem(ItemVO itemVO) {
		//상품 등록
		int result = sqlSession.insert("adminMapper.regItem", itemVO);
		//상품 이미지등록
		sqlSession.insert("adminMapper.regImgs", itemVO);
		return result;
		
	}

	//다음 등록될 상품 코드 조회
	@Override
	public String getNextItemCode() {
		return sqlSession.selectOne("adminMapper.getNextItemCode");
	}

	//상품 목록 조회(상품 검색 기능 포함)
	@Override
	public List<ItemVO> getItemList(ItemVO itemVO) {
		return sqlSession.selectList("adminMapper.getItemList", itemVO);
	}

	//상품관리 - 상품 상세 조회
	@Override
	public ItemVO getItemDetailAjax(ItemVO itemVO) {
		return sqlSession.selectOne("adminMapper.getItemDetailAjax", itemVO);
	}

	//상품관리 - 상품 정보 수정
	@Override
	public int updateItemInfo(ItemVO itemVO) {
		return sqlSession.update("adminMapper.updateItemInfo", itemVO);
	}
	
	//회원 목록 조회
	@Override
	public List<MemberVO> getMemberList() {
		return sqlSession.selectList("adminMapper.getMemberList");
	}
	
	@Override
	public void memRoleUpdate(MemberVO memberVO) {
		sqlSession.update("adminMapper.memRoleUpdate", memberVO);
	}
	
	//주문관리 : 주문 상태목록(이름,코드) 조회
	@Override
	public List<StatusInfoVO> getStatusInfoList() {
		return sqlSession.selectList("adminMapper.getOrderStatusNameList");
	}
	
	//주문 목록 카운트 조회
	@Override
	public int getOrderCount(SearchOrderVO searchOrderVO) {
		return sqlSession.selectOne("adminMapper.getOrderCount", searchOrderVO);
	}
	
	//주문관리 : 주문 목록 조회
	@Override
	public List<OrderStatusVO> getOrderList(SearchOrderVO searchOrderVO, PageVO pageVO) {
		Map<String, Object> orderList = new HashMap<>();
		orderList.put("searchOrderVO", searchOrderVO);
		orderList.put("pageVO", pageVO);
		return sqlSession.selectList("adminMapper.getOrderList", orderList);
	}
	
	// 주문 관리 : 주문 정보 조회(주문 상태 별)
	@Override
	public List<OrderStatusVO> getOrderStatus(String searchOrderStatus) {
		return sqlSession.selectList("adminMapper.getOrderStatus", searchOrderStatus);
	}
	
	// 주문 상태 다음 레벨로 이동
	@Override
	public void updateOrderStatus(Map<String, Object> updateMap) {
		sqlSession.update("adminMapper.updateOrderStatus", updateMap);	
	}

	//매출조회
	@Override
	public List<TotalRevenueVO> getRevenueList() {
		return sqlSession.selectList("adminMapper.getRevenueList");
	}

	//매출조회(DECODE 활용 vo 활용)
	@Override
	public List<TotalRevenue2VO> getRevenueList2(int year) {
		return sqlSession.selectList("adminMapper.getRevenueList3", year);
	}
	
	//매출조회(DECODE 활용 map 활용)
	@Override
	public List<Map<String, Integer>> getRevenueList3(int year) {
		return sqlSession.selectList("adminMapper.getRevenueList2", year);
	}

	//카테고리별 판매 추이
	@Override
	public List<Map<String, Object>> getCateChartDataAjax() {
		return sqlSession.selectList("adminMapper.getCateSaleTrend");
	}

}
