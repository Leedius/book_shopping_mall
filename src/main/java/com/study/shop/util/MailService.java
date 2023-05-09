package com.study.shop.util;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.study.shop.member.vo.MemberVO;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;


@Service("mailService")
public class MailService {
	@Autowired
	private JavaMailSender javaMailSender;
	
	//타임리프문법 객체 생성
	@Autowired
	private SpringTemplateEngine templateEngine;
	
	//단순 문자 메일 보내기
	public void sendSimpleEmail(MailVO mailVO) {
		//단순 문자 메일을 보낼 수 있는 객체 생성
		SimpleMailMessage message = new SimpleMailMessage();
		message.setSubject(mailVO.getTitle());
		message.setTo(mailVO.getAddressList().toArray(new String[mailVO.getAddressList().size()]));
		message.setText(mailVO.getMessage());
		
		javaMailSender.send(message);
	}
	
	//HTML 메일 보내기
	public void sendHTMLEmail(MailVO mailVO, MemberVO memberVO) {
		MimeMessage message = javaMailSender.createMimeMessage();
		
		try {
			message.setSubject(mailVO.getTitle());
			message.setText(setContext(memberVO.getMemPw()), "UTF-8", "html");
			message.addRecipients(MimeMessage.RecipientType.TO, mailVO.getAddressList().toArray(new InternetAddress[mailVO.getAddressList().size()]));
			//message.addRecipients(MimeMessage.RecipientType.TO, mailVO.getAddressList().toArray(new Address[mailVO.getAddressList().size()]));
			javaMailSender.send(message);
			System.out.println("메일 전송 완료!");
		} catch (MessagingException e) {
			System.out.println("메일 전송 실패!!");
			e.printStackTrace();
		}
		
		
	}
	
	//6자리의 랜덤 비밀번호 생성
	public String createRandPw() {
		//랜덤함수로 임시비밀번호 구문 만들기
		String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		//랜덤함수 객체 생성
		StringBuilder resetPw = new StringBuilder();
		Random random = new Random();

		//문자 배열 길이의 값을 랜덤으로 6개를 뽑아 구문을 작성함
		for (int i = 0; i < 6; i++) {
			int index = random.nextInt(CHARACTERS.length());
			char randomChar = CHARACTERS.charAt(index);
			resetPw.append(randomChar);
		}
		return resetPw.toString();
	}
	
	//6자리의 랜덤 비밀번호 생성(다른버전)
	public String createRandPw2() {
        String[] charSet = new String[]{ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
		        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
		        "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"};
        
        String resetPw = "";
        
        for(int i = 0; i < 6; i++) {
        	int randIndex =  (int)(Math.random() * charSet.length - 1);	// 0 <= x < 1 실수 리턴
        	resetPw += charSet[randIndex];
        }
        return resetPw;
	}
	
	//HTML 메일 보낼 시 내용 세팅
	public String setContext(String password) {
		//org.thymleaf선택
		Context context = new Context();
		context.setVariable("password", password);
		
		return templateEngine.process("mail", context);
	}
}
