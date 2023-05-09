package com.study.shop.util;

import java.util.Calendar;

public class DateUtil {
	//오늘 날짜를 문자열로 리턴
	public static String getNowDateToString() {
		Calendar cal = Calendar.getInstance();
		
		int year = cal.get(Calendar.YEAR);//년도 2023
		int month = cal.get(Calendar.MONTH) + 1;//월 3
		int day = cal.get(Calendar.DATE);//일 12
		//%02d : d는 숫자의 의미  2는 자리수 0은 빈자리일시 채울 변수
		return year + "-" + String.format("%02d", month) + "-" + String.format("%02d", day) ;
 	}
	
	public static String getNowDateToString(String seperator) {
		Calendar cal = Calendar.getInstance();
		
		int year = cal.get(Calendar.YEAR);//년도 2023
		int month = cal.get(Calendar.MONTH) + 1;//월 3
		int day = cal.get(Calendar.DATE);//일 12
		//%02d : d는 숫자의 의미  2는 자리수 0은 빈자리일시 채울 변수
		return year + seperator + String.format("%02d", month) + seperator + String.format("%02d", day) ;
 	}
	
	//이번달의 첫 날짜
	public static String getFirstDateOfMonth() {
		return getNowDateToString().substring(0,8) + "01";
	}
	
	//올해의 년도
	public static int getYear() {
		Calendar cal = Calendar.getInstance();
		return cal.get(Calendar.YEAR);
	}
	
}

//싱글톤 패턴
class aaa{
	static aaa a = new aaa();
	
	private aaa() {}
	
	public static aaa getAaa() {
		if(a == null) {
			return new aaa();
		}
		else {
			return a;
		}
	}
}