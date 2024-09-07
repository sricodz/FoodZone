package com.food.zone.utils;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class AuthUtils {

	//This method is used to fetch the token from request
	public String fetchTokenFromRequest(HttpServletRequest req) {
		Cookie[] cookies = req.getCookies();
		if(cookies!=null) {
			for(Cookie cookie : cookies) {
				if("token".equalsIgnoreCase(cookie.getName())) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}
}
