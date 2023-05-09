package com.study.shop.util;

import java.util.List;

import jakarta.mail.internet.InternetAddress;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter@ToString
public class MailVO {
	private List<InternetAddress> addressList;
	private String title;
	private String message;
}
