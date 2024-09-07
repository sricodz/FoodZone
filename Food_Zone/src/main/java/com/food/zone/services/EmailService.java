package com.food.zone.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.food.zone.dto.MailBody;

@Service
public class EmailService {

	private final JavaMailSender mailSender;
	
	public EmailService(JavaMailSender mailSender) {
		this.mailSender=mailSender;
	}
	
	public void sendSimpleMessage(MailBody mailBody) {
		
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(mailBody.to());
		msg.setFrom("venkatdr143@gmail.com");
		msg.setSubject(mailBody.subject());
		msg.setText(mailBody.text());
		
		mailSender.send(msg);
	}
}
