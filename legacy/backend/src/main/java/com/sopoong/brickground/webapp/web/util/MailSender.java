package com.sopoong.brickground.webapp.web.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Component
public class MailSender {

	@Autowired
	public JavaMailSender javaMailSender;
	
	private String FROM_ADDRESS = "help@gosopoong.co.kr";

	@Async
	public void sendMail(String email, String title, String content) {
		
		String message ="";
		message += "\n";
		message += "안녕하세요. 브릭그라운드입니다. \n";
		message += "\n\n";
		message += content + "\n";
		message += "\n\n";
		message += "감사합니다.";
		
		SimpleMailMessage simpleMessage = new SimpleMailMessage();
		// simpleMessage.setFrom("보낸사람@naver.com"); // NAVER, DAUM, NATE일 경우 넣어줘야 함
		simpleMessage.setFrom(FROM_ADDRESS);
		simpleMessage.setTo(email);
		simpleMessage.setSubject(title);
		simpleMessage.setText(message);
		javaMailSender.send(simpleMessage);
	}
}

