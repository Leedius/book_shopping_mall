package com.study.shop.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.study.shop.item.vo.ImgVO;

public class UploadUtil {
	//단일 파일 업로드 메소드
	public static ImgVO uploadFile(MultipartFile img) {
		ImgVO imgVO = null;
		
		if(!img.isEmpty()) {
			imgVO = new ImgVO();
			//1.원본 파일명
			String originFileName = img.getOriginalFilename();
			
			//2.서버에 올라갈 파일명 생성(랜덤한 문자열을 생성)
			String uuid = UUID.randomUUID().toString();		//랜덤으로 이름을 지정
			
			//3.첨부된 파일의 확장자 추출
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			
			//4.첨부될 파일명
			String attachedFileName = uuid + extension;
			
			//확인용
			System.out.println("원본 파일명 : " + originFileName);
			System.out.println("첨부 파일명 : " + attachedFileName);
			
			//5.파일 업로드
			try {
				File file = new File(ConstVariable.UPLOAD_PATH + attachedFileName);
				img.transferTo(file);
				
				imgVO.setOriginFileName(originFileName);
				imgVO.setAttachedFileName(attachedFileName);
				imgVO.setIsMain("Y");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return imgVO;
	}

	// 다중 파일 업로드 메소드
	public static List<ImgVO> multiFileUpload(MultipartFile[] imgs) {
		//다중 파일을 저장할 통 생성
		List<ImgVO> result = new ArrayList<>();
		for (MultipartFile img : imgs) {
			ImgVO vo = uploadFile(img);
			vo.setIsMain("N");
			//각각의 객체를 리스트에 저장
			result.add(vo);
		}
		return result;
	}
	
	/* --------- 공부용 ----------
	//--- 파일 첨부 ---//
	//mainImg가 비어 있지 않을때만 첨부 실행
	//메인 이미지 업로드
	if(!mainImg.isEmpty()) {
		//1.파일 업로드 위치
		//자바에서는 특수문자를 문자열로 인식시키고 싶을때 \를 넣는다
		//그래서 아래에서 \는 특수문자이기 때문에 문자열로 인식 못하기 때문에
		//문자열로 인식시키기위해 \를 한개 더 넣는다.
		//상수는 보통 대문자로 만들고 합성어일 경우 _로 연결 시킨다.
		//final String UPLOAD_PATH = "C:\\dev\\workspaceSTS\\Shop\\src\\main\\resources\\static\\upload\\images\\item";
		
		//2.원본 파일명
		String originFileName = mainImg.getOriginalFilename();
		
		//3.서버에 올라갈 파일명 생성(랜덤한 문자열을 생성)
		String uuid = UUID.randomUUID().toString();		//랜덤으로 이름을 지정
		
		//4.첨부된 파일의 확장자 추출
		//예제
		//abc.jpg -> kldjfskfj.jpg
		//String str = "abcdab.jpg";
		//str.indexOf("c");	//2
		//str.indexOf("a");	//0 제일 처음에 있는 index값을 가져옴
		//str.lastIndexOf("a"); //4 마지막에 있는 index값을 가져옴
		//originFileName.substring(0); //0번째부터 끝까지
		String extension = originFileName.substring(originFileName.lastIndexOf("."));
		
		//5.첨부될 파일명
		String attachedFileName = uuid + extension;
		
		System.out.println("원본 파일명 : " + originFileName);
		System.out.println("첨부 파일명 : " + attachedFileName);
		
		//6.파일 업로드
		try {
			File file = new File(ConstVariable.UPLOAD_PATH + attachedFileName);
			mainImg.transferTo(file);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//서브 이미지들 업로드
	//여러개라서 있는 만큼 반복
	for(MultipartFile img : subImg) {
		if(!img.isEmpty()) {
			//1.원본 파일명
			String originFileName = img.getOriginalFilename();
			
			//2.서버에 올라갈 파일명 생성(랜덤한 문자열을 생성)
			String uuid = UUID.randomUUID().toString();		//랜덤으로 이름을 지정
			
			//3.첨부된 파일의 확장자 추출
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			
			//4.첨부될 파일명
			String attachedFileName = uuid + extension;
			
			//확인용
			System.out.println("원본 파일명 : " + originFileName);
			System.out.println("첨부 파일명 : " + attachedFileName);
			
			//5.파일 업로드
			try {
				File file = new File(ConstVariable.UPLOAD_PATH + attachedFileName);
				img.transferTo(file);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	---------------------------------------*/
	
}
