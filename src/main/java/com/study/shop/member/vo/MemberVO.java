package com.study.shop.member.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberVO {
    private String memId;
    private String memPw;
    private String memName;
    private String gender;
    private String memTell;
    private String memAddr;
    private String addrDetail;
    private String memEmail;
    private String memRole;
    private int memStatus;
    private String joinDate;
    private String[] memTells;
    
    /*
    public void setMemTell(String[] memTell) {
        // 배열의 값을 하이픈(-)으로 구분하여 문자열로 합치고 할당
        this.memTell = String.join("-", memTell);
    }

	public void setMemTell(String memTell) {
		this.memTell = memTell;
	}
	*/
}
